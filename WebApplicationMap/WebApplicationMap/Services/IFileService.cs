using WebApplicationMap.Models;

namespace WebApplicationMap.Services;

public interface IFileService
{
    void SaveDrawing(Drawing drawing);
    List<Drawing> GetDrawings();
}