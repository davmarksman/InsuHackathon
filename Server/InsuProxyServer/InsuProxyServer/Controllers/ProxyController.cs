using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;

namespace InsuProxyServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProxyController : ControllerBase
    {
        private readonly HttpClient _httpClient;

        public ProxyController(HttpClient httpClient)
        {
            this._httpClient = httpClient;
        }

        [HttpGet]
        [Route("Flood")]
        public async Task<ActionResult> GetFlood(string latitude, string longitude)
        {
            using (HttpResponseMessage response = await _httpClient.GetAsync($"https://www.checkmyfloodrisk.co.uk/Home/GetFloodRisk?Latitude={latitude}&Longitude={longitude}"))
            {
                response.EnsureSuccessStatusCode();

                var jsonResponse = await response.Content.ReadAsStringAsync();
                return this.Content(jsonResponse, "application/json");
            }
        }
    }
}
