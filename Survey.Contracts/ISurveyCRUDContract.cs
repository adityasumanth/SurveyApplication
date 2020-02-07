using Survey.Concerns;
using System;
using System.Collections.Generic;
using System.Text;

namespace Survey.Contracts
{
    public interface ISurveyCRUDContract
    {
        List<SurveyForm> GetSurveyForms();
    }
}
