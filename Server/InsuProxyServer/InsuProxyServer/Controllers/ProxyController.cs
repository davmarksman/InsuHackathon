using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Net.Http.Headers;

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



        [HttpGet]
        [Route("RightMove")]
        public async Task<ActionResult> GetRightMove()
        {
            var listUrls= new List<string> {
                $"https://api.rightmove.co.uk/api/sale/find?index=0&sortType=1&numberOfPropertiesRequested=2&locationIdentifier=POSTCODE%5E1149959&apiApplication=IPAD",
$"https://api.rightmove.co.uk/api/sale/find?index=0&sortType=1&numberOfPropertiesRequested=2&locationIdentifier=OUTCODE%5E1&apiApplication=IPAD",
            };

            var req = listUrls[new Random().Next(0, listUrls.Count())];

            //var req = $"https://www.rightmove.co.uk/api/search?locationIdentifier=POSTCODE%5E{postCode}&numberOfPropertiesPerPage=24&radius=0.5&sortType=2&index=0&includeSSTC=false&viewType=LIST&channel=BUY&areaSizeUnit=sqft&currencyCode=GBP&isFetching=false&viewport=";
           // var req = $"https://api.rightmove.co.uk/api/sale/find?index=0&sortType=1&numberOfPropertiesRequested=2&locationIdentifier=OUTCODE%5E1&apiApplication=IPAD";
            using (HttpResponseMessage response = await _httpClient.GetAsync(req))
            {
                //response.EnsureSuccessStatusCode();

                var jsonResponse = await response.Content.ReadAsStringAsync();
                return this.Content(jsonResponse, "application/json");
            }
        }

        [HttpGet]
        [Route("CompaniesHouse")]
        public async Task<ActionResult> GetCompaniesHouse(string no)
        {

            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue();
            var req = $"https://api.company-information.service.gov.uk/company/{no}";

            using (HttpResponseMessage response = await _httpClient.GetAsync(req))
            {
                //response.EnsureSuccessStatusCode();

                var jsonResponse = await response.Content.ReadAsStringAsync();
                return this.Content(jsonResponse, "application/json");
            }
        }
    }
}
