﻿using Survey.Concerns;
using System;
using System.Collections.Generic;
using System.Text;

namespace Survey.Contracts
{
    public interface ISurveyContract
    {
        List<SurveyForm> GetSurveyForms();
        List<SurveyForm> GetSurveyFormsAsAdmin();
        SurveyForm GetSurveyFormById(int id);
        List<SurveyData> GetSurveyData(int id);
        SurveyData PostPollData(SurveyData pollData);
        SurveyForm PostNewSurveyForm(SurveyForm surveyForm);
        User AuthenticateUser(UserData userData);
        SurveyForm PutSurveyForm(SurveyForm surveyForm);
    }
}
