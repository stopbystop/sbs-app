FROM node:8.0 as node
WORKDIR /sbs-app
RUN mkdir --parents ./sbs-gh/src/web/wwwroot
COPY ./sbs-gh/src/client ./sbs-gh/src/client
COPY ./sbs-gh/src/web/wwwroot ./sbs-gh/src/web/wwwroot
COPY ./sbs-gh/package.json ./sbs-gh/
WORKDIR /sbs-app/sbs-gh
RUN npm install
RUN npm run build-web

#ARG CB=1
#* Note: run this step only once. Generate poi data. Run ``sudo dotnet run --project ./sbs-vso/src/console_utils/Yojowa.StopByStop.ConsoleUtils.csproj genpoi``
#* Generate city images. Run ``sudo dotnet run --project ./sbs-vso/src/console_utils/Yojowa.StopByStop.ConsoleUtils.csproj gendestimg``


FROM microsoft/dotnet:2.0-sdk as dotnet
WORKDIR /sbs-app
COPY ./sbs-gh/src/build/*proj sbs-gh/src/build/
COPY ./sbs-gh/src/interfaces/*proj sbs-gh/src/interfaces/
COPY ./sbs-gh/src/utils/*proj sbs-gh/src/utils/
COPY ./sbs-gh/src/npgsqlom/*proj sbs-gh/src/npgsqlom/
COPY ./sbs-gh/src/web/*proj sbs-gh/src/web/
COPY ./sbs-vso/src/build/*proj sbs-vso/src/build/
COPY ./sbs-vso/src/console_utils/*proj sbs-vso/src/console_utils/
COPY ./sbs-vso/src/kdtree/*proj sbs-vso/src/kdtree/
COPY ./sbs-vso/src/places/*proj sbs-vso/src/places/
COPY ./sbs-vso/src/route_logic/*proj sbs-vso/src/route_logic/
COPY ./sbs-vso/src/service/*proj sbs-vso/src/service/
COPY ./sbs-vso/src/service_interfaces/*proj sbs-vso/src/service_interfaces/
COPY ./sbs-vso/src/service_utils/*proj sbs-vso/src/service_utils/
COPY ./sbs-vso/src/store/*proj sbs-vso/src/store/
COPY ./sbs-vso/src/ydata_provider/*proj sbs-vso/src/ydata_provider/
RUN dotnet restore ./sbs-gh/src/web/Yojowa.StopByStop.Web.csproj -p:ProxyService='False'
COPY ./sbs-vso/src ./sbs-vso/src
COPY ./sbs-gh/src/interfaces sbs-gh/src/interfaces
COPY ./sbs-gh/src/utils sbs-gh/src/utils
RUN dotnet run --project ./sbs-vso/src/console_utils/Yojowa.StopByStop.ConsoleUtils.csproj genpoi


COPY ./sbs-gh/src ./sbs-gh/src
RUN dotnet build -c Release ./sbs-gh/src/web/Yojowa.StopByStop.Web.csproj -p:ProxyService='False'
COPY --from=node /sbs-app/sbs-gh/src/web/wwwroot /sbs-app/sbs-gh/src/web/wwwroot
COPY ./sbs-vso/sbs_destinations ./sbs-vso/sbs_destinations
RUN dotnet run --project ./sbs-vso/src/console_utils/Yojowa.StopByStop.ConsoleUtils.csproj gendestimg

EXPOSE 5000
ENV ASPNETCORE_URLS http://*:5000
WORKDIR ./sbs-gh/src/web
ENTRYPOINT ["dotnet", "run", "-c", "Release", "--no-restore", "--no-build", "--no-launch-profile"]