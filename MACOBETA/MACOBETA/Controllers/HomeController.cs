using MACOBETA.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.Reflection;

namespace MACOBETA.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        //Autenticacion del usuario     RELV       19/09/2024
        public IActionResult Index()
        {
            //if (HttpContext.Session.GetString("User") == null)
            //{
            //    return RedirectToAction("Login", "Account");

            //    //ViewBag.ShowLoginModal = true;

            //    //HttpContext.Session.GetString("User");
            //    //return RedirectToAction();
            //}
            //return View();
            return View();
        }

        public IActionResult Login()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
