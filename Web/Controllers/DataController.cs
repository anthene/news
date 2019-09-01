using System;
using System.Linq;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using static System.Convert;
using static Newtonsoft.Json.JsonConvert;
using static System.IO.File;
using static System.IO.Path;
using Newtonsoft.Json.Serialization;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Reflection;

namespace Web.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class DataController : Controller
    {
        readonly string _webRootPath;
        readonly JsonSerializerSettings _newsJsonSerializerSettings = GetJsonSerializerSettings<IgnorePropertyContractResolver>(cr => Init(cr, "data"));
        readonly JsonSerializerSettings _newsListJsonSerializerSettings = GetJsonSerializerSettings<IgnorePropertyContractResolver>(cr => Init(cr, "data", "content"));
        readonly JsonSerializerSettings _jsonSerializerSettings = GetJsonSerializerSettings<DefaultContractResolver>(Init);

        static JsonSerializerSettings GetJsonSerializerSettings<TContractResolver>(Func<TContractResolver, TContractResolver> initContractResolver)
            where TContractResolver : DefaultContractResolver, new () =>
            new JsonSerializerSettings
            {
                ContractResolver = initContractResolver(new TContractResolver())
            };

        static DefaultContractResolver Init(DefaultContractResolver contractResolver)
        {
            contractResolver.NamingStrategy = new CamelCaseNamingStrategy();
            return contractResolver;
        }

        static IgnorePropertyContractResolver Init(IgnorePropertyContractResolver contractResolver, params string[] propetyNames)
        {
            Init((DefaultContractResolver)contractResolver);
            contractResolver.PropertyNames = propetyNames;
            return contractResolver;
        }

        public DataController(IHostingEnvironment env)
        {
            _webRootPath = env.WebRootPath;
        }

        [HttpGet("news-list-{date}.json")]
        public IActionResult GetNews(string date)
        {
            return Ok(new object[0]);
        }

        [HttpGet("short-news-list-{date}.json")]
        public IActionResult GetShortNews(string date)
        {
            return Ok(new object[0]);
        }

        [HttpDelete("news/{id}")]
        public IActionResult DeleteNews(uint id)
        {
            var (newsFilePath, imageFilePath) = GetNewsFilePaths(_webRootPath, id);

            if (!Exists(newsFilePath))
                return NotFound($"The news (ID: {id}) has not been found. Check the ID.");

            var news = DeserializeObject<News>(ReadAllText(newsFilePath), _jsonSerializerSettings);

            var newsListFilePath = GetNewsListFilePath(_webRootPath, news.Date);

            if (Exists(newsListFilePath))
            {
                var newsList = DeserializeObject<ICollection<News>>(ReadAllText(newsListFilePath), _jsonSerializerSettings);
                var newsToRemove = newsList.SingleOrDefault(n => n.Id == news.Id);
                if (newsToRemove != default(News))
                    newsList.Remove(newsToRemove);
                WriteAllText(newsListFilePath, SerializeObject(newsList, _jsonSerializerSettings));
            }

            Delete(newsFilePath);

            var successMessage = $"The news (ID: {id}) has been removed.";
            if (!Exists(imageFilePath))
                return Ok($"{successMessage}\r\nThe news image has not been found.");

            Delete(imageFilePath);

            return Ok(successMessage);
        }

        [HttpPost("news")]
        public IActionResult AddNews([FromBody] News news)
        {
            news.Id = ToUInt32(new Random().Next(int.MaxValue));

            var (newsFilePath, imageFilePath) = GetNewsFilePaths(_webRootPath, news.Id);

            WriteAllText(newsFilePath, SerializeObject(news, _newsJsonSerializerSettings));
            WriteAllBytes(imageFilePath, FromBase64String(news.Image.Data));

            return Ok(news.Id);
        }

        [HttpGet("news/{id}/publish")]
        public IActionResult PublishNews(uint id)
        {
            var newsFilePath = GetNewsFilePath(_webRootPath, id);

            if (!Exists(newsFilePath))
                return NotFound($"The news (ID: {id}) has not been found. Check the ID.");

            var news = DeserializeObject<News>(ReadAllText(newsFilePath), _newsJsonSerializerSettings);

            var newsListFilePath = GetNewsListFilePath(_webRootPath, news.Date);

            if (!Exists(newsListFilePath))
                WriteAllText(newsListFilePath, SerializeObject(new News[0], _newsListJsonSerializerSettings));

            var newsList = DeserializeObject<ICollection<News>>(ReadAllText(newsListFilePath), _newsListJsonSerializerSettings);

            newsList.Add(news);

            WriteAllText(newsListFilePath, SerializeObject(newsList.OrderByDescending(n => n.Date), _newsListJsonSerializerSettings));

            return Ok();
        }

        [HttpDelete("short/{date}")]
        public IActionResult DeleteShortNews(DateTime date)
        {
            var fileName = GetShortNewsListFilePath(_webRootPath, date);
            if (!Exists(fileName))
                return BadRequest("Short news for such a date does not exist.");

            Delete(fileName);

            return Ok();
        }

        [HttpPost("short")]
        public IActionResult AddShortNews([FromBody] ShortNews[] shortNews)
        {
            var dates = shortNews.Select(sn => sn.Date.ToUniversalTime().Date).Distinct();
            if (dates.Count() > 1)
                return BadRequest("The short news list contains different dates.");

            var date = dates.Single();
            var fileName = GetShortNewsListFilePath(_webRootPath, date);

            WriteAllText(fileName, SerializeObject(shortNews, _jsonSerializerSettings));

            return Ok();
        }

        static string GetDataFolder(string webRootPath) =>
            Combine(webRootPath, "data");

        static string GetNewsFilePath(string webRootPath, uint id) =>
            Combine(GetDataFolder(webRootPath), $"{id}.json");

        static string GetNewsImageFilePath(string webRootPath, uint id) =>
            Combine(GetDataFolder(webRootPath), "images", $"{id}.jpg");

        static string GetNewsListFilePath(string webRootPath, DateTime date) =>
            Combine(GetDataFolder(webRootPath), $"news-list-{date.ToString("yyyyMMdd")}.json");

        static string GetShortNewsListFilePath(string webRootPath, DateTime date) =>
            Combine(GetDataFolder(webRootPath), $"short-news-list-{date.ToString("yyyyMMdd")}.json");

        static (string news, string image) GetNewsFilePaths(string webRootPath, uint id) =>
            (GetNewsFilePath(webRootPath, id), GetNewsImageFilePath(webRootPath, id));
    }

    public interface INews
    {
        DateTime Date { get; set; }

        string Header { get; set; }
    }

    public class ShortNews : INews
    {
        // todo: make validation
        public DateTime Date { get; set; }

        [Required]
        public string Header { get; set; }
    }

    public class News : INews
    {
        public uint Id { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        public string Header { get; set; }

        [Required]
        public Image Image { get; set; }

        [Required]
        [MinLength(1)]
        public IEnumerable<string> Content { get; set; }
    }

    public class Image
    {
        [Required]
        public string Owner { get; set; }

        [Required]
        public string Data { get; set; }
    }

    public class IgnorePropertyContractResolver : DefaultContractResolver
    {
        public IEnumerable<string> PropertyNames;

        // public static readonly ShouldSerializeContractResolver Instance = new ShouldSerializeContractResolver();

        protected override JsonProperty CreateProperty(MemberInfo member, MemberSerialization memberSerialization)
        {
            var property = base.CreateProperty(member, memberSerialization);

            if (PropertyNames.Contains(property.PropertyName))
                property.ShouldSerialize = instance => false;

            return property;
        }
    }
}
