using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Survey.Concerns;
using Survey.Concerns.Helpers;
using Survey.Contracts;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace Survey.Providers
{
    public class UserProvider : IUserContract
    {
        private readonly AppSettings _appSettings;
        private readonly SurveyDbContext _dbContext;


        public UserProvider(IOptions<AppSettings> appSettings, SurveyDbContext context)
        {
            _appSettings = appSettings.Value;
            this._dbContext = context;

        }

        public User AuthenticateUser(UserData userData)

        {
            Byte[] pwdinputBytes = Encoding.UTF8.GetBytes(userData.password);
            SHA512 shaM = new SHA512Managed();
            Byte[] pwdhashedBytes = shaM.ComputeHash(pwdinputBytes);
            string pwd = Convert.ToBase64String(pwdhashedBytes);

            var user = _dbContext.Users.SingleOrDefault(x => x.UserName == userData.username && x.Password == pwd);

            if (user != null && user.UserName == userData.username)
            {
                if (user.Password == pwd)
                {
                    // authentication successful so generate jwt token
                    var tokenHandler = new JwtSecurityTokenHandler();
                    var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
                    var tokenDescriptor = new SecurityTokenDescriptor
                    {
                        Subject = new ClaimsIdentity(new Claim[]
                        {
                    new Claim(ClaimTypes.Name, user.UserId.ToString())
                        }),
                        Expires = DateTime.UtcNow.AddDays(7),
                        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                    };
                    var token = tokenHandler.CreateToken(tokenDescriptor);
                    user.Token = tokenHandler.WriteToken(token);
                    user.Password = "valid";
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
