using Survey.Concerns;
using System;
using System.Collections.Generic;
using System.Text;

namespace Survey.Contracts
{
    public interface IUserContract
    {
        User AuthenticateUser(UserData userData);
        User UserAdminStatus(User user);
        User Register(User user);
    }
}
