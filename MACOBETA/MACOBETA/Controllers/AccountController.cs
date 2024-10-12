/**************************************************************
  
Creador: Rodrigo Esau Lopez Vazquez (RELV)
Fecha de creacion: 19/09/2024
Funcion: se añade la lógica para validar el usuario

version         Fecha           Modificador
1.0             19/09/2024      RELV

****************************************************************/

using MACOBETA.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace MACOBETA.Controllers
{
    public class AccountController : Controller
    {
        //public IActionResult Index()
        //{
        //    return View();
        //}

        // Ingreso al Login
        //[HttpGet]
        ////public IActionResult Login()
        ////{
        ////    return View();
        ////}

        //// Ingreso de contraseña y validacion de usuario
        //[HttpPost]
        //public ActionResult Login(LoginViewModel model)
        //{
        //    /*
        //    if ((model.Username == "MACO5" && model.Password == "Maco5_$$"))
        //    {
        //        HttpContext.Session.SetString("User", model.Username);
        //        return RedirectToAction("Index", "Home");
        //    }
        //    if (!ModelState.IsValid)
        //    {
        //        // Devuelve la vista con los mensajes de error
        //        return View();
        //    }
        //    ModelState.AddModelError("", "Usuario o contraseña incorrectos");
        //    return View(model);*/
        //    if (model.Username == "MACO5" && model.Password == "Maco5_$$") // Lógica de validación
        //    {
        //        // Lógica para iniciar sesión
        //        return Json(new { success = true }); // Retorna JSON en caso de éxito
        //    }
        //    return Json(new { success = false });
        //    //return View();
        //}
            /*
        //Salida de usuario y cierre de sesion
        public IActionResult Logout()
        {
            HttpContext.Session.Clear();
            return RedirectToAction("Login");
        }

        [HttpPost]
        public IActionResult Login2([FromBody] LoginViewModel model)
        {
            HttpContext.Session.SetString("User", model.Username);
            return RedirectToAction("Index", "Home");


        }*/

       
        [HttpPost]
        public IActionResult Login([FromBody] LoginViewModel model)
        {
            // Aquí iría la lógica de autenticación
            if (model.Username == "admin" && model.Password == "password") // Ejemplo de autenticación
            {
                return PartialView("Index");
            }
            else
            {
                ViewBag.Error = "Usuario o contraseña incorrectos";
                return PartialView("Index");
            }
        }

        public IActionResult Index()
        {
            return PartialView();
        }

    }
}
