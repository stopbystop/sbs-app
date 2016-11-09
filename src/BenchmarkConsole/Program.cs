using BenchmarkDotNet.Configs;
using BenchmarkDotNet.Diagnostics.Windows;
using BenchmarkDotNet.Running;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BenchmarkConsole
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("started.");
            try
            {
                ManualConfig manualConfig = ManualConfig.CreateEmpty();

                manualConfig.Add(new MemoryDiagnoser());

                IConfig config = ManualConfig.Union(DefaultConfig.Instance, manualConfig);

                var result = BenchmarkRunner.Run<PlaceTest>(config);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }

            Console.WriteLine("finished. press enter to exit.");
            Console.ReadLine();
        }
    }
}
