# Polyline Drawing and Querying API

This is a backend API for a web application that allows users to add and query polyline drawings on a map. The backend is built using ASP.NET Core and provides endpoints for saving and retrieving drawing data.

## Features

- Add polyline drawings with user-provided name and number.
- Retrieve all saved polyline drawings.

## Technologies Used

- ASP.NET Core 6
- C#
- Newtonsoft.Json for JSON serialization/deserialization
- File system for data storage

## Endpoints

### Add a Drawing

**URL:** `/api/drawings/add`

**Method:** `POST`

**Request Body:**

```json
{
    "name": "Sample Drawing",
    "number": 1,
    "coordinates": [
        [30.0, 40.0],
        [31.0, 41.0]
    ]
}
```

**Project Structure**
* Controllers/DrawingsController.cs: The main controller handling the API requests.
* Models/Drawing.cs: The model representing a drawing.
* Services/IFileService.cs and Services/FileService.cs: The service responsible for reading and writing drawing data to the file system.
appsettings.json: Configuration file.

**Clone the repository For Backend:**

```bash
git clone project_url
cd WebApplicationMap
```
```bash
dotnet restore
dotnet run
```
**Frontend With Angular**
```bash
cd map-app-frontend
npm install -g @angular/cli
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```
```bash
npm install
ng serve
```

**File Storage**
* The drawing data is stored in a JSON file located at a path specified in the configuration. If the file does not exist, it will be created automatically. If the file is empty or contains invalid JSON, it will be reset.