using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Yojowa.StopByStop.Utils
{
    public class SegmentUtil
    {
        /// <summary>
        /// Segment Width. used while segmenting world. must be positive
        /// </summary>
        private const double LngIncrement = 1;

        /// <summary>
        /// Segment Height. used while segmenting world. must be positive
        /// </summary>
        private const double LatDecrement = 1;

        /// <summary>
        /// Get the 1 degree of long distance in miles for the given LAT. LAT is the key
        /// </summary>
        public static Dictionary<int, double> LongDistanceInMiles = new Dictionary<int, double>();

        static SegmentUtil()
        {
            for (int lat = -180; lat <= 180; lat++)
            {
                double distance = Extensions.DistanceTo(new Location { Lat = lat, Lon = 0 },
                                                        new Location { Lat = lat, Lon = 1 },
                                                        UnitOfLength.Miles);

                if (distance < 1) //can be 0 at -90 and 90 only, we just ignore for math and set it to 1
                    distance = 1;

                LongDistanceInMiles.Add(lat, distance);
            }
        }

        /// <summary>
        /// will return all segments
        /// </summary>
        /// <param name="AllGeo"></param>
        /// <returns></returns>
        public static SegmentCollection GetAllSegments(List<GeoPlace> AllGeo)
        {
            //Generate biggest rectangle within all result.
            double wrapperX = AllGeo.Min(x => x.Location.Lon);
            double wrapperRight = AllGeo.Max(x => x.Location.Lon);

            double wrapperY = AllGeo.Max(x => x.Location.Lat);
            double wrapperBottom = AllGeo.Min(x => x.Location.Lat);

            Segment wrapper = new Segment(wrapperX, wrapperY, wrapperRight - wrapperX, wrapperY - wrapperBottom);

            SegmentCollection allWorldSegments = GetWorldSegments(wrapper);

            //Populate segments with points
            int segmentID = 1;
            foreach (Segment segment in allWorldSegments)
            {
                segment.ID = segmentID;
                segmentID++;

                foreach (GeoPlace geo in AllGeo)
                {
                    if (segment.ContainsPoint(geo.Location))
                        segment.Geos.Add(geo);
                }
            }            

            //remove segments that have no geo
            for (int i = allWorldSegments.Count - 1; i >= 0; i--)
            {
                Segment currentSegment = allWorldSegments[i];
                if (currentSegment.Geos.Count == 0)
                    allWorldSegments.RemoveAt(i);
            }

            return allWorldSegments;
        }

        private static SegmentCollection GetWorldSegments(Segment wrapper)
        {
            SegmentCollection result = new SegmentCollection();

            //double lat = geo.Location.Lat; //  -90 > x > 90
            //double lng = geo.Location.Lon; // -180 > x > 180

            //Generate a mapping by distance
            /*
        * Each degree of latitude is approximately 69 miles (111 kilometers) apart.
        *  The range varies (due to the earth's slightly ellipsoid shape) from 68.703 miles (110.567 km) at the equator
        *   to 69.407 (111.699 km) at the poles. 
        *   This is convenient because each minute (1/60th of a degree) is approximately one [nautical] mile.

       A degree of longitude is widest at the equator at 69.172 miles (111.321) and gradually shrinks to zero at the poles.
       At 40° north or south the distance between a degree of longitude is 53 miles (85 km)*/

            //whole world
            double xStart = -180;
            double xEnd = 180;

            double yStart = 90;
            double yStartOriginal = yStart; //will be used to reset its value.
            double yEnd = -90;

            //if any world segment wrapper is present, just use is for boundiries
            if (wrapper != null)
            {
                xStart = wrapper.X;
                xEnd = wrapper.Right;

                yStart = wrapper.Y;
                yStartOriginal = yStart; //will be used to reset its value.
                yEnd = wrapper.Bottom;
            }

            while (xStart <= xEnd)
            {
                while (yStart >= yEnd)
                {
                    //döngü ensol üstten baslıyor. aşağıya doğru gidiyor.

                    double right = xStart + LngIncrement;
                    double bottom = yStart - LatDecrement;

                    Segment seg = Segment.FromLTRB(xStart, yStart, right, bottom);

                    result.Add(seg);

                    //lat decrement
                    yStart = bottom; // yStart - LatDecrement
                }

                //reset lat
                yStart = yStartOriginal;

                //increment lng
                xStart = xStart + LngIncrement;
            }

            return result;
        }
    }

    public class SegmentCollection : List<Segment>
    {
        public IEnumerable<Segment> GetSegmentsForSearch(Location centerPoint, double radiusInMiles)
        {

            //Each degree of latitude is approximately 69 miles(111 kilometers)
            double latRadius = radiusInMiles / 69;

            //get defree of lng from dictonary.
            double lngRadius = radiusInMiles / SegmentUtil.LongDistanceInMiles[(int)centerPoint.Lat];

            double top = centerPoint.Lat + latRadius;
            double bottom = centerPoint.Lat - latRadius;

            double left = centerPoint.Lon - lngRadius;
            double right = centerPoint.Lon + lngRadius;

            Segment searchSegment = Segment.FromLTRB(left, top, right, bottom);

            return this.Where(x => x.IntersectsWith(searchSegment));
        }

        public List<GeoPlace> GetGeosForSearch(Location centerPoint, double radiusInMiles)
        {
            List<GeoPlace> result = new List<GeoPlace>();

            foreach (Segment segment in GetSegmentsForSearch(centerPoint, radiusInMiles))
            {
                result.AddRange(segment.Geos);
            }

            return result;
        }
    }


    public class Segment
    {
        public List<GeoPlace> Geos { get; private set; }

        public int ID { get; set; }

        /// <summary>
        /// Top left corner x-coordinate. LNG. Smaller in degree. Reffered as [LEFT]
        /// </summary>
        public double X { get; private set; }

        /// <summary>
        /// Top left corner y-coordinate LAT. Bigger in degree. Reffered as [TOP]
        /// </summary>
        public double Y { get; private set; }


        /// <summary>
        /// Lower right corner x-coordinate LNG. Bigger in degree. Reffered as [RIGHT]
        /// </summary>
        public double Right { get; private set; }

        /// <summary>
        /// Lower right corner y-coordinate LAT. Smaller in degree. Reffered as [BOTTOM]  
        /// </summary>
        public double Bottom { get; private set; }

        /// <summary>
        /// Rectangle Width
        /// </summary>
        public double Width { get; private set; }

        /// <summary>
        /// Rectangle Height
        /// </summary>
        public double Height { get; private set; }


        public static readonly Segment Empty = new Segment(0, 0, 0, 0);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="x">top left X or LNG or LEFT [-180 180]</param>
        /// <param name="y">top left Y or LAT or TOP [90 -90]</param>
        /// <param name="width">Width</param>
        /// <param name="height">Height</param>
        public Segment(double x, double y, double width, double height)
        {
            this.Geos = new List<GeoPlace>();
            this.X = x;
            this.Y = y;
            this.Width = width;
            this.Height = height;

            this.Right = x + width;
            this.Bottom = y - height;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="left">top left X or LNG or LEFT [-180 180]</param>
        /// <param name="top">top left Y or LAT or TOP [90 -90]</param>
        /// <param name="right">bottom right X or LNG [-180 180]</param>
        /// <param name="bottom">bottom right Y or LAT [90 -90]</param>
        /// <returns></returns>
        public static Segment FromLTRB(double left, double top, double right, double bottom)
        {
            return new Segment(left,
                                 top,
                                 right - left,
                                 top - bottom);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="x">X or LNG</param>
        /// <param name="y">Y or LAT</param>
        /// <returns></returns>
        public bool ContainsPoint(double x, double y)
        {
            return this.X <= x &&
            x < this.Right &&
            this.Y >= y &&
            y > this.Bottom;
        }

        public bool ContainsPoint(Location point)
        {
            return ContainsPoint(point.Lon, point.Lat);
        }

        /// <summary>
        /// returns the intersect segment. Return Segment.Empty if no conflict
        /// </summary>
        /// <param name="a"></param>
        /// <param name="b"></param>
        /// <returns></returns>
        public static Segment Intersect(Segment a, Segment b)
        {
            double x1 = Math.Max(a.X, b.X);
            double x2 = Math.Min(a.Right, b.Right);
            double y1 = Math.Min(a.Y, b.Y);
            double y2 = Math.Max(a.Bottom, b.Bottom);

            if (x2 >= x1
                && y2 <= y1)
            {

                return new Segment(x1, y1, x2 - x1, y1 - y2);
            }
            return Segment.Empty;
        }

        public bool IntersectsWith(Segment seg)
        {
            return (seg.X < this.Right) &&
            (this.X < seg.Right) &&
            (seg.Y > this.Bottom) &&
            (this.Y > seg.Bottom);
        }

        public static bool SegmentEquals(Segment left, Segment right)
        {
            if (left == null)
                throw new ArgumentNullException("left");

            if (right == null)
                throw new ArgumentNullException("right");

            return (left.X == right.X
                && left.Y == right.Y
                && left.Width == right.Width
                && left.Height == right.Height);
        }

        public override string ToString()
        {
            return string.Format("LTRB = {0} {1} {2} {3}", this.X, this.Y, this.Right, this.Bottom);
        }

    }
}
