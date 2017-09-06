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
RUN find . -type f
COPY ./sbs-vso/src ./sbs-vso/src
COPY ./sbs-gh/src ./sbs-gh/src
RUN find . -type f
RUN dotnet build -c Release ./sbs-gh/src/web/Yojowa.StopByStop.Web.csproj -p:ProxyService='False'

FROM node:8.0
WORKDIR /sbs-app
COPY --from=dotnet /sbs-app .
WORKDIR /sbs-app/sbs-gh
RUN npm install
COPY ./sbs-gh/package.json ./
RUN npm install typescript -g
RUN npm install gulp-cli -g
RUN npm run build-web

#EXPOSE 5000
#ENV ASPNETCORE_URLS http://*:5000
#WORKDIR ./sbs-gh/src/web
#ENTRYPOINT ["dotnet", "run", "-c", "Release"]