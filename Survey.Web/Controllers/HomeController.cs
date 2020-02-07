using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Survey.Concerns;
using Survey.Contracts;

namespace Survey.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        public ISurveyCRUDContract SurveyCRUDProvider { get; set; }
        public HomeController(ISurveyCRUDContract surveyCRUD)
        {
            this.SurveyCRUDProvider = surveyCRUD;
        }
       [HttpGet]
        public List<SurveyForm> GetSurveyForms()
        {
            List<SurveyForm> f = new List<SurveyForm>();
            f.Add(new SurveyForm
            {
                SurveyFormId = 1,
                Title = "First Survey",
                Questions = new List<SurveyQuestion>()
            });
            f[0].Questions.Add(new SurveyQuestion
            {
                Id = 2,
                Question="Fav Color?",
                Options = new List<SurveyOption>()

            }) ;
            f[0].Questions[0].Options.Add(new SurveyOption
            {
                Id=3,
                OptionValue="Red"
            });
            f[0].Questions[0].Options.Add(new SurveyOption
            {
                Id = 4,
                OptionValue = "Blue"
            });
            f[0].Questions[0].Options.Add(new SurveyOption
            {
                Id = 5,
                OptionValue = "Green"
            });
            f.Add(new SurveyForm());
            f[1].Questions = new List<SurveyQuestion>();
            f[1].Questions.Add(new SurveyQuestion());
            f[1].Questions[0].Options = new List<SurveyOption>();
            f[1].Questions[0].Options.Add(new SurveyOption());
            return f;
        }
    }
}