# Employee-WebApp-FullStack

### Descripton

I build this FullStack-WebApp to train how .Net Web Api works and get more praxis in C# and Angular CRUD operations.
I use only Visual Studio Code.

### Stack:

- .Net8 Web Api with C#
- SQLite
- Angular 18
- Tailwind Css

### Preparation:

you need some tool on your system to run this APP:

- .Net8 : https://dotnet.microsoft.com/en-us/download/dotnet/8.0
- Angular CLi: `npm install -g @angular/cli`
- Clone Reposetory

### Install:

1. open folder after clone repo.
2. go to /clinet `npm install` to install all package from package.json
3. run `ng serve`
4. got to /Api `dotnet watch run` to start the APi server an SwaggerUI.

If you get some errors please check SwaggerUI if you're API {port} is correct in /client/src/app/service/employees.service.ts
if not change it and save!

apiUrl = 'http://localhost:5093/api/Employees';

apiUrl = 'http://localhost:{port}/api/Employees';

### Play

Now have fun and play with the code.
