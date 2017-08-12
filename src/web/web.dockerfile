FROM microsoft/dotnet:1.1-sdk

WORKDIR /web
COPY ./src/Yojowa.StopByStop.Web.csproj .
RUN dotnet restore

COPY ./src/ .
RUN dotnet restore
RUN dotnet publish -c Release -o out

EXPOSE 5000
ENTRYPOINT ["dotnet", "out/Yojowa.StopByStop.Web.dll"]