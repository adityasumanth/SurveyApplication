
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
        [Route("admin-surveys")]
        public List<SurveyForm> GetSurveyFormsAsAdmin()
        {
            return this.SurveyProvider.GetSurveyFormsAsAdmin();

        }

        [HttpGet]
        [Route("survey/{id}")]
        public SurveyForm GetSurveyFormById(int id)
        {
            return this.SurveyProvider.GetSurveyFormById(id);
            
        }

        [HttpGet]
        [Route("pollData/{id}")]
        public List<SurveyData> GetSurveyData(int id)
        {
            return this.SurveyProvider.GetSurveyData(id);
            
        }
        [HttpPost]
        [Route("addSurvey")]
        public SurveyForm PostNewSurveyForm([FromBody]SurveyForm surveyForm)
        {
            return this.SurveyProvider.PostNewSurveyForm(surveyForm);
        }

        [HttpPut]
        [Route("updateSurvey")]
        public SurveyForm PutSurveyForm([FromBody]UpdateSurvey updateSurvey )
        {
            if (updateSurvey == null)
            {
                return null;
            }
           return this.SurveyProvider.PutSurveyForm(updateSurvey.SurveyForm,updateSurvey.DeletedQuestions,updateSurvey.DeletedOptions);
        }

        [HttpPut]
        [Route("changeState")]
        public SurveyForm ChangeState([FromBody]int id)
        {
            return this.SurveyProvider.ChangeState(id);
        }

        [HttpPost]
        [Route("pollSurvey")]
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