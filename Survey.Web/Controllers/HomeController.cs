
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Survey.Concerns;
using Survey.Contracts;
using Survey.Providers;

namespace Survey.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private readonly SurveyDbContext dbContext;
        public ISurveyCRUDContract SurveyCRUDProvider { get; set; }
        public HomeController(ISurveyCRUDContract surveyCRUD, SurveyDbContext dbContext)
        {
            this.SurveyCRUDProvider = surveyCRUD;
            this.dbContext = dbContext;
        }
        [HttpGet]
        [Route("surveys")]
        public List<SurveyForm> GetSurveyForms()
        {
            List<SurveyForm> forms = this.dbContext.SurveyForms.ToList();
            forms.ForEach(form =>
            {
                form.Questions = this.dbContext.SurveyQuestions.Where(ques => ques.SurveyFormId == form.SurveyFormId).ToList();
                form.Questions.ForEach(ques =>
                {
                    ques.Options = this.dbContext.SurveyOptions.Where(optn => optn.SurveyQuestionId == ques.Id).ToList();
                }
                );
            });

            return forms;
        }


        [HttpGet]
        [Route("survey/{id}")]
        public SurveyForm GetSurveyFormById(int id)
        {
            SurveyForm form = dbContext.SurveyForms.Find(id);
            if (form == null)
            {
                return null;
            }
            else
            {
                form.Questions = this.dbContext.SurveyQuestions.Where(ques => ques.SurveyFormId == form.SurveyFormId).ToList();
                form.Questions.ForEach(ques =>
                {
                    ques.Options = this.dbContext.SurveyOptions.Where(optn => optn.SurveyQuestionId == ques.Id).ToList();
                }
                );
                return form;
            }
        }

        [HttpPost]
        [Route("addForm")]
        public SurveyForm PostNewSurveyForm ([FromBody]SurveyForm surveyForm)
        {
            this.dbContext.SurveyForms.Add(surveyForm);
            this.dbContext.SaveChanges();

            return surveyForm;
        }


        [HttpPost]
        [Route("poll")]
        public SurveyData PostPollData([FromBody]SurveyData pollData)
        {
            this.dbContext.SurveyData.Add(pollData);
            this.dbContext.SaveChanges();
            
            return pollData;
        }
        [HttpGet]
        [Route("polldata/{id}")]
        public List<SurveyData> GetSurveyData(int id)
        {
            List<SurveyData> data = dbContext.SurveyData.Where(d => d.SurveyFormId == id).ToList();
            data.ForEach(entry =>
            {
                entry.Answers = dbContext.SurveyAnswers.Where(answer => answer.SurveyDataId == entry.Id).ToList();
            });
            return data;
        }
       
    }
}