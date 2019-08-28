using System;
using System.Linq;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using static Newtonsoft.Json.JsonConvert;
using static System.IO.File;
using static System.IO.Path;
using Newtonsoft.Json.Serialization;
using Newtonsoft.Json;

namespace Web.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class DataController : Controller
    {
        readonly string _webRootPath;
        readonly JsonSerializerSettings _jsonSerializerSettings = new JsonSerializerSettings
        {
            ContractResolver = new DefaultContractResolver
            {
                NamingStrategy = new CamelCaseNamingStrategy()
            }
        };

        public DataController(IHostingEnvironment env)
        {
            _webRootPath = env.WebRootPath;
        }

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

        [HttpPost("short")]
        public IActionResult AddShortNews([FromBody] ShortNews[] shortNews)
        {
            var dates = shortNews.Select(sn => sn.Date.ToUniversalTime().Date).Distinct();
            if (dates.Count() > 1)
                return BadRequest("The short news list contains different dates.");

            var date = dates.Single();
            var fileName = Combine(_webRootPath, "data", $"short-news-list-{date.ToString("yyyyMMdd")}.json");

            WriteAllText(fileName, SerializeObject(shortNews, _jsonSerializerSettings));

            return Ok();
        }
    }

    public class ShortNews
    {
        public DateTime Date { get; set; }

        public string Header { get; set; }
    }
}
