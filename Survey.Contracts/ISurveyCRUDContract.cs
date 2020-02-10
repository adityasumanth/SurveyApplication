using Survey.Concerns;
using System;
using System.Collections.Generic;
using System.Text;

namespace Survey.Contracts
{
    public interface ISurveyCRUDContract
    {
        List<SurveyForm> GetSurveyForms();
        public SurveyForm GetSurveyFormById(int id);
        public List<SurveyData> GetSurveyData(int id);
        public SurveyData PostPollData(SurveyData pollData);

    }
}
