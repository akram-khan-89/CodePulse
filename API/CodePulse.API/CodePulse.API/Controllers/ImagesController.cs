using CodePulse.API.Models.Domain;
using CodePulse.API.Models.DTO;
using CodePulse.API.Repositories.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CodePulse.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImagesController : ControllerBase
    {
        private readonly IImageRepository imageRepository;
        public ImagesController(IImageRepository imageRepository)
        {
            this.imageRepository = imageRepository;
        }

        //POST: {apiBaseUrl}/api/images
        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> UploadImage([FromForm] UploadImageRequestDto request)
        {
            ValidateFile(request.File);

            if (ModelState.IsValid)
            {
                //File upload
                var blogImage = new BlogImage
                {
                    FileExtension = Path.GetExtension(request.File.FileName).ToLower(),
                    FileName = request.FileName,
                    Title = request.Title,
                    DateCreated = DateTime.Now,
                };

                blogImage = await imageRepository.Upload(request.File, blogImage);

                // Convert Domain Model to DTO
                var response = new BlogImageDto
                {
                    Id = blogImage.Id,
                    Title = blogImage.Title,
                    DateCreated = blogImage.DateCreated,
                    FileExtension = blogImage.FileExtension,
                    FileName = blogImage.FileName,
                    Url = blogImage.Url,
                };

                return Ok(response);

            }

            return BadRequest(ModelState);
        }

        private void ValidateFile(IFormFile file)
        {
            var allowedExtensions = new string[] { ".jpg", ".jpeg", ".png" };

            if (!allowedExtensions.Contains(Path.GetExtension(file.FileName).ToLower()))
            {
                ModelState.AddModelError("file", "Unsupported file format");
            }

            //dont allow file size more than  10mb
            if (file.Length > 10485768)
            {
                ModelState.AddModelError("file", "File Size Cannot be more than 10MB");
            }
        }
    }
}
