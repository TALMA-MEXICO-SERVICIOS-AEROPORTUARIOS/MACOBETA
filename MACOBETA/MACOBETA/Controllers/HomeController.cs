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

        //Inicia el Index con el logeo comprobado     RELV       19/09/2024
        public IActionResult Index()
        {          
            //ViewBag.Username = model.Username; // Almacena el nombre de usuario en ViewBag
            return View();
        }

        //Inicia el Login al abrir la pagina    RELV    14/10/2024
        public IActionResult Login(LoginViewModel model)
        {
            if (ModelState.IsValid)
            {
                HttpContext.Session.SetString("Username", model.Username);
                return Json(new { success = true }); // Respuesta exitosa
            }

            return View(); // Muestra el Login
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
