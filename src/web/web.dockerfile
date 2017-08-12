FROM microsoft/dotnet:1.1-sdk

WORKDIR /sbs-app
COPY ./web/Yojowa.StopByStop.Web.csproj web/
COPY ./interfaces/Yojowa.StopByStop.Interfaces.csproj interfaces/
COPY ./utils/Yojowa.StopByStop.Utils.csproj utils/
RUN dotnet restore ./web/Yojowa.StopByStop.Web.csproj

COPY ./web/ web/
COPY ./utils/ utils/
COPY ./interfaces/ interfaces/
RUN dotnet restore ./web/Yojowa.StopByStop.Web.csproj
RUN dotnet publish -c Release -o out ./web/Yojowa.StopByStop.Web.csproj

EXPOSE 5000
ENV ASPNETCORE_URLS http://*:5000
WORKDIR web
ENTRYPOINT ["dotnet", "run", "./web/Yojowa.StopByStop.Web.csproj"]