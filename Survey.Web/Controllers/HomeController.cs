
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
        private readonly SurveyDbContext _dbContext;
        public ISurveyCRUDContract SurveyCRUDProvider { get; set; }
        public HomeController(ISurveyCRUDContract surveyCRUD, SurveyDbContext dbContext)
        {
            this.SurveyCRUDProvider = surveyCRUD;
            this._dbContext = dbContext;
        }
        [HttpGet]
        [Route("surveys")]
        public List<SurveyForm> GetSurveyForms()
        {
            /*return _context.SurveyForms.ToList();*/


            List<SurveyForm> forms = this._dbContext.SurveyForms.ToList();
            forms.ForEach(form =>
            {
                form.Questions = this._dbContext.SurveyQuestions.Where(ques => ques.SurveyFormId == form.SurveyFormId).ToList();
                form.Questions.ForEach(ques =>
                {
                    ques.Options = this._dbContext.SurveyOptions.Where(optn => optn.SurveyQuestionId == ques.Id).ToList();
                }
                );
            });

            return forms;
        }


        [HttpGet]
        [Route("survey/{id}")]
        public SurveyForm GetSurveyFormById(int id)
        {
            SurveyForm form = _dbContext.SurveyForms.Find(id);
            if (form == null)
            {
                return null;
            }
            else
            {
                form.Questions = this._dbContext.SurveyQuestions.Where(ques => ques.SurveyFormId == form.SurveyFormId).ToList();
                form.Questions.ForEach(ques =>
                {
                    ques.Options = this._dbContext.SurveyOptions.Where(optn => optn.SurveyQuestionId == ques.Id).ToList();
                }
                );
                return form;
            }
        }

        [HttpPost]
        [Route("addForm")]
        public SurveyForm PostNewSurveyForm ([FromBody]SurveyForm surveyForm)
        {
            this._dbContext.SurveyForms.Add(surveyForm);
            this._dbContext.SaveChanges();

            return surveyForm;
        }


        [HttpPost]
        [Route("poll")]
        public SurveyData PostPollData([FromBody]SurveyData pollData)
        {
            this._dbContext.SurveyData.Add(pollData);
            this._dbContext.SaveChanges();
            
            return pollData;
        }
        [HttpGet]
        [Route("polldata/{id}")]
        public List<SurveyData> GetSurveyData(int id)
        {
            List<SurveyData> data = _dbContext.SurveyData.Where(d => d.SurveyFormId == id).ToList();
            data.ForEach(entry =>
            {
                entry.Answers = _dbContext.SurveyAnswers.Where(answer => answer.SurveyDataId == entry.Id).ToList();
            });
            return data;
        }
        
    }
}