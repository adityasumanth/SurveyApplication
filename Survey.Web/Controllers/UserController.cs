using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Survey.Concerns;
using Survey.Contracts;

namespace Survey.Web.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        public IUserContract UserProvider { get; set; }

        public UserController(IUserContract userContract)
        {
            this.UserProvider = userContract;
        }



        [AllowAnonymous]
        [HttpPost("authenticate")]
        public User AuthenticateUser([FromBody] UserData userData)
        {
            return this.UserProvider.AuthenticateUser(userData);
        }

        [HttpPost]
        [Route("getUserAdminStatus")]
        public User GetUserAdminStatus([FromBody]User user)
        {
            return this.UserProvider.UserAdminStatus(user);
        }
        [HttpPost]
        [Route("getUserByUserName")]
        public User GetUserByUserName([FromBody] UserData user)
        {
            return this.UserProvider.GetUserByUserName(user);
        }

        [HttpPost]
        [Route("getUser")]
        public User GetUserByToken([FromBody]User user)
        {
            return this.UserProvider.getOrRegisterUser(user);
        }
        [HttpPost]
        [Route("getUserByUpdatingToken")]
        public User GetUserByUpdatingToken([FromBody]User user)
        {
            return this.UserProvider.GetUserByUpdatingToken(user);
        }
        [HttpPost]
        [Route("register")]
        public User Register([FromBody]User user)
        {
            return this.UserProvider.Register(user);
        }
    }
}