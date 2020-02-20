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
        User GetUserByEmail(string email);
        User Register(User user);
        User getOrRegisterUser(User user);
        User GetUserByUpdatingToken(User user);
    }
}
