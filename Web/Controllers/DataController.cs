using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class DataController : Controller
    {
        [HttpGet("news-list-{date}.json")]
        public IActionResult News(string date)
        {
            return Ok(new object[0]);
        }

        [HttpGet("short-news-list-{date}.json")]
        public IActionResult ShortNews(string date)
        {
            return Ok(new object[0]);
        }
    }
}
