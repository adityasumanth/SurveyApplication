
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Survey.Concerns;
using Survey.Contracts;

namespace Survey.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        public ISurveyContract SurveyProvider { get; set; }
        public HomeController(ISurveyContract surveyCRUD)
        {
            this.SurveyProvider = surveyCRUD;
        }

        [HttpGet]
        [Route("surveys")]
        public List<SurveyForm> GetSurveyForms()
        {
            return this.SurveyProvider.GetSurveyForms();
            
        }

        [HttpGet]
        [Route("survey/{id}")]
        public SurveyForm GetSurveyFormById(int id)
        {
            return this.SurveyProvider.GetSurveyFormById(id);
            
        }

        [HttpGet]
        [Route("polldata/{id}")]
        public List<SurveyData> GetSurveyData(int id)
        {
            return this.SurveyProvider.GetSurveyData(id);
            
        }
        [HttpPost]
        [Route("addForm")]
        public SurveyForm PostNewSurveyForm([FromBody]SurveyForm surveyForm)
        {
            return this.SurveyProvider.PostNewSurveyForm(surveyForm);
        }
        [HttpPost]
        [Route("poll")]
        public SurveyData PostPollData([FromBody]SurveyData pollData)
        {
            return this.SurveyProvider.PostPollData(pollData);
            
        }
        [HttpPost]
        [Route("authenticate")]
        public User AuthenticateUser([FromBody] UserData userData)
        {
            return this.SurveyProvider.AuthenticateUser(userData);
        }
    }
}