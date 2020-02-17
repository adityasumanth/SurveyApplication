using Microsoft.EntityFrameworkCore;
using Survey.Concerns;
using Survey.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Survey.Providers
{
    public class SurveyProvider : ISurveyContract
    {
        private readonly SurveyDbContext _dbContext;
        public SurveyProvider(SurveyDbContext context)
        {
            this._dbContext = context;
        }
        public List<SurveyForm> GetSurveyForms()
        {
            List<SurveyForm> forms = this._dbContext.SurveyForms.Where(form=>form.isActive==true).ToList();
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

        public List<SurveyForm> GetSurveyFormsAsAdmin()
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

        public SurveyForm PostNewSurveyForm(SurveyForm surveyForm)
        {
            this._dbContext.SurveyForms.Add(surveyForm);
            this._dbContext.SaveChanges();

            return surveyForm;
        }

        public SurveyForm PutSurveyForm(SurveyForm surveyForm,List<SurveyQuestion> deletedQuestions,List<SurveyOption> deletedOptions)
        {
            this._dbContext.Entry(surveyForm).State = EntityState.Modified;
            foreach(var question in surveyForm.Questions)
            {
                if (question.Id==0)
                {
                    this._dbContext.SurveyQuestions.Add(question);
                }
                else
                {
                    this._dbContext.Entry(question).State = EntityState.Modified;
                    foreach (var option in question.Options)
                    {
                        if (option.Id==0)
                        {
                            this._dbContext.SurveyOptions.Add(option);
                        }
                        else
                        {
                            this._dbContext.Entry(option).State = EntityState.Modified;
                        } 
                    }
                }
            }
            foreach (var question in deletedQuestions)
            {
                this._dbContext.SurveyQuestions.Remove(question);
            }
            foreach (var option in deletedOptions)
            {
                this._dbContext.SurveyOptions.Remove(option);
            }

            this._dbContext.SaveChanges();
            return surveyForm;
        }

        public SurveyForm ChangeState(int id)
        {
            SurveyForm form = _dbContext.SurveyForms.Include("Questions.Options").FirstOrDefault(_=>_.SurveyFormId==id);
            form.isActive = form.isActive ? false : true;
            this._dbContext.Entry(form).State = EntityState.Modified;
            this._dbContext.SaveChanges();
            return form;
        }

        public User Register(User user)
        {
            user.isAdmin = false;
            this._dbContext.Users.Add(user);
            this._dbContext.SaveChanges();
            return user;
        }

        public User AuthenticateUser(UserData userData)
        {
            User user = _dbContext.Users.Where(user => user.UserName == userData.username).FirstOrDefault();
            if (user != null && user.UserName == userData.username)
            {
                if (user.Password == userData.password)
                {
                        return user;
                }
                user = new User();
                user.FirstName = "Password is Wrong.";
                return user;
            }
            user = new User();
            user.FirstName = "UserName doesn't Exist";
            return user;
        }
    }
}
