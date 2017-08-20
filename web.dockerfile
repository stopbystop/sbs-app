FROM microsoft/dotnet:1.1-sdk
WORKDIR /sbs-app
COPY ./sbs-gh/src/ sbs-gh/src/
COPY ./sbs-vso/src/ sbs-vso/src/
RUN dotnet restore ./sbs-gh/src/web/Yojowa.StopByStop.Web.csproj
RUN dotnet publish -c Release -o out ./sbs-gh/src/web/Yojowa.StopByStop.Web.csproj

EXPOSE 5000
ENV ASPNETCORE_URLS http://*:5000
WORKDIR web
ENTRYPOINT ["dotnet", "run", "./sbs-gh/src/web/Yojowa.StopByStop.Web.csproj"]