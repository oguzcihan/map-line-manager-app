using Newtonsoft.Json;
using WebApplicationMap.Models;

namespace WebApplicationMap.Services;

public class FileService : IFileService
{
    private readonly string _filePath = "drawings.json";

    public void SaveDrawing(Drawing drawing)
    {
        var drawings = GetDrawings();
        drawings.Add(drawing);
        File.WriteAllText(_filePath, JsonConvert.SerializeObject(drawings));
    }

    public List<Drawing> GetDrawings()
    {
        if (!File.Exists(_filePath))
        {
            return new List<Drawing>();
        }

        var json = File.ReadAllText(_filePath);
        if (string.IsNullOrWhiteSpace(json))
        {
            File.Delete(_filePath);
            return new List<Drawing>();
        }

        return JsonConvert.DeserializeObject<List<Drawing>>(json) ?? new List<Drawing>();
    }
}