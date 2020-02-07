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

        }
        public List<SurveyForm> GetSurveyForms()
        {
            List<SurveyForm> forms = this._dbContext.SurveyForms.ToList();
            forms.ForEach(form =>
            {
                form.Questions = new List<SurveyQuestion>();
                this._dbContext.SurveyQuestions.ToList().ForEach(ques =>
                {
                    if (ques.SurveyFormId == form.SurveyFormId)
                    {
                        ques.Options = new List<SurveyOption>();
                        this._dbContext.SurveyOptions.ToList().ForEach(optn => { 
                           if(optn.SurveyQuestionId == ques.Id)
                            {
                                ques.Options.Add(optn);
                            }
                        });
                        form.Questions.Add(ques);
                    }
                });
            });
            return forms;
        }
    }
}
