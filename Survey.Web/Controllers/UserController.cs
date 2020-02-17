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
    [Route("api/[controller]")]
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
    }
}