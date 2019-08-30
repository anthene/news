FROM node AS ui
WORKDIR /app

COPY data data
COPY news-core news-core
COPY news-web-core news-web-core
COPY news-ng news-ng

RUN cd news-core \
    npm i \
    npm start \
    cd ../news-web-core \
    npm i \
    npm start \
    cd ../news-ng \
    npm i \
    npm run prestart

FROM mcr.microsoft.com/dotnet/core/sdk AS build
WORKDIR /app

COPY Web Web
WORKDIR /app/Web
COPY --from=ui /app/news-ng/bin wwwroot
COPY --from=ui /app/news-ng/bin/index.html Views/Shared/_Layout.cshtml
RUN dotnet restore
RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/core/aspnet AS runtime
WORKDIR /app
COPY --from=build /app/Web/out .
ENTRYPOINT ["dotnet", "News.Web.dll"]
