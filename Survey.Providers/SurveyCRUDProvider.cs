using Survey.Concerns;
using Survey.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Survey.Providers
{
    public class SurveyCRUDProvider : ISurveyCRUDContract
    {
        private SurveyDbContext _dbContext { get; set; }
        public SurveyCRUDProvider(SurveyDbContext context)
        {
            this._dbContext = context;
        }
        public List<SurveyForm> GetSurveyForms()
        {
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

        public List<SurveyData> GetSurveyData(int id)
        {
            List<SurveyData> data = _dbContext.SurveyData.Where(d => d.SurveyFormId == id).ToList();
            if (data.Count() == 0)
            {
                return null;
            }
            else
            {
                data.ForEach(entry =>
                {
                    entry.Answers = _dbContext.SurveyAnswers.Where(answer => answer.SurveyDataId == entry.Id).ToList();
                });
                return data;
            }
        }

        public SurveyData PostPollData(SurveyData pollData)
        {
            this._dbContext.SurveyData.Add(pollData);
            this._dbContext.SaveChanges();
            return pollData;
        }
    }
}
