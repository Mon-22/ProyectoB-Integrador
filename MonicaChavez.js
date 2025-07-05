// Sistema para gestion de biblioteca
// me recomendaron que lo mas que puediera trabajarlo en Ingles asi lo hiciera y lo intente.

// aqui tenemos el prompt , este lo utilizamos por que vamos a interactuar con el usuario.

const prompt=require('prompt-sync')();

// Library Data ( Arrays ) 
// en esta parte cpoloque los arras que utilice para almacenar usuarios y libros
// Aqui se muestran los arrays utilizados dentro de nuestro codigo.

let Books = [
  {id: 1,   
    title: "A la sombra del Angel",    
    author: "Kathryn S. Blair",   
    year: 2010 ,   
    genre: "Novela Biografica",   
    available: true },  
  {id: 2,  
    title: "La biblioteca de la media noche", 
    author: "  Matt Haig  " , 
    year: 2021 ,  
    genre: "Ficcion", 
    available: true },
 {id: 3, 
    title: "Harry Potter y El Prisionero de Askaban", 
    author:"J. K Rowling" , 
    year: 1999 , 
    genre: "Fantasia",   
    available: true },  
  {id: 4, 
    title: "El asesinato de Aristoteles", 
    author: "Marcos Chicot",  
    year: 2025 ,   
    genre: "Novela Historica",   
    disponible: true }, 
 {id: 5,   
    title: "Matilde",    
    author : "Carlos Pascual",   
    year: 2021 ,   
    genre: "Novela Biografica",  
    available: true } , 
 {id: 6,   
    title: "Los Siete Maridos de Evelyn Hugo",   
    author: "Taylor Jenkins Reid" ,   
    year: 2020 ,   
    genre: "Novela" ,   
    available: true }  ,
 {id: 7,  
    title: "El principe",
    author: "Nicolas Maquiavelo",   
    year: 1532 ,   
    genre: "Tratado politico",   
    available: true }  ,
 {id: 8,   
    title: "El Hombre en busca de sentido",    
    author: "Viktor Frankl" ,   
    year: 1946 ,   
    genre: "Autobiografica",  
    available: true }  ,
 {id: 9,   
    title: "Mis dias en la libreria Morisaki",    
    author: "Kathryn S. Blair",   
    year: 2010 ,   
    genre: "Novela",   
    available: true } ,
 {id: 10,   
    title: " Cincuenta palos y sigo soñando",    
    author: "Pau Donés" ,   
    year: 2017 ,   
    genre: "Autobiografica",   
    available: true }  ,
 {id: 11,   
    title: " Cincuenta palos y sigo soñando",    
    author: "Pau Donés" ,   
    year: 2017 ,   
    genre: "Autobiografica",   
    available: false }  ,
];
let Users =  [
  {UserId: 1,
    UserName: 'Venus ',
    UserLastname: 'Tiana ',
    UserAge: 30,   
    UserMail: ' venusTiana@mailito.com',
    lendBooks: [],
    activated: true},
  {UserId: 2,
    UserName: 'Ash  ',
    UserLastname: ' Ketchum ',
    UserAge: 12,   
    UserMail: ' Pikachu@mailito.com',
    lendBooks:[],
    activated: true},
    {UserId: 3,
    UserName: 'Jimi  ',
    UserLastname: ' Hendrix ',
    UserAge: 40,   
    UserMail: ' Jimito@mailito.com',
    lendBooks:[],
    activated: true},  
    {UserId: 4,
    UserName: 'Hermione  ',
    UserLastname: ' Granger ',
    UserAge: 10,   
    UserMail: ' Hermion@mailito.com',
    lendBooks:[],
    activated: true},  
    {UserId: 5,
    UserName: 'Lord  ',
    UserLastname: ' Voldemort ',
    UserAge: 25,   
    UserMail: ' dontenebroso@mailito.com',
    lendBooks:[],
    activated: true}    
];


// special functions block---------------------------------------------------------------------------------
// aqui estaran los metodos utilizados.

// looking book by id ( esta es la funcion que utilizo para ir a buscar los libros )

function SearchBookById(searchBookId){
  return Books.find((Book)=>{return Book.id===searchBookId});
    }

 // looking book by criteria ( este tambien lo utilice para buscar el libro pero aqui se realiza por criterio):

function SearchBookByCriteria(SearchBookCriteria,criteriaValue){
  switch (SearchBookCriteria){
    case "titulo": 
    return Books.filter((Book)=>{return Book.title===criteriaValue});
    case "autor": 
    return Books.filter((Book)=>{return Book.author===criteriaValue});
    case "genero": 
    return Books.filter((Book)=>{return Book.genre===criteriaValue});
  }
}  

// looking User by id :
function SearchUserById(searchUserId){
  return Users.find((user)=>{return user.UserId===searchUserId});
    }
// looking user by e-mail:
function SearchUserByEmail(searchUserEmail){
  return Users.find((user)=>{return user.UserMail===searchUserEmail});
    }    

// Deleted books
function DeleteBookById(id){
  Books = Books.filter(Book => Book.id  !== id); 
  console.log(' El libro ha sido borrado: '+id); 
  }
     
// Deleted Users
function DeleteUserById(id){
  Users = Users.filter(User => User.UserId  !== id)
  console.log(' El Usuario ha sido eliminado: '+id); 
}

// adjustment title of book and space on author. 
function DataNormalizeBook(Book){
    Book.title = Book.title.toUpperCase();
    Book.author = Book.author.trim();
    return Book ;
}
   // screen clean 
function ClearConsole(){
   console.clear(); // investigue como efectuar esta limpieza 
}

// function print users

function PrintUsers (Users){
  const UserData=Users.map(user =>({
  Name : user.UserName.trim(),
  lastname:user.UserLastname.trim(),
  mail:user.UserMail.trim(),
  lend:user.LendBooks ? user.LendBooks.join(' , ') : ' Ninguno' //
  }));
  console.log (' Lista de usuarios: '); 
  console.table(UserData);
}

// lends book

function lendBook(){
  let BookId = parseInt(prompt('Ingresa Id del libro a prestar:  '));
  let UserId = parseInt(prompt( ' Ingrese Id del usuario: '));
  
  if (isNaN(BookId) || isNaN (UserId)){
    console.log (' Por favor Ingresa datos correctos '); 
    return; 
  }
   let Book = Books.find(b=>b.id === BookId);
   let user = Users.find(u =>u.UserId ===UserId);
   
   if (!Book){
    console.log ( ' No se encontro ese libro '); 
    return
   }
   if (!Book.available){
    console.log (' El libro no se encuentra disponible en este momento ');
    return 
   }
   if (!user){
    console.log(' Usuario no registrado. ');
    return
   }

  Users.forEach(currentUser => {
     if (currentUser.UserId===user.UserId){
      currentUser.lendBooks.push(
        Book.id
      );
     }
  });    

   Book.available=false;
}


// function return books : 

function returnBook(){
  let BookId = parseInt(prompt(' Ingresa el Id del libro que desea regresar: '));
  let UserId = parseInt(prompt(' Ingresa el Id del Usuario que esta regresando el libro: '));

if (isNaN(BookId) || isNaN (UserId)){
    console.log (' Por favor Ingresa datos correctos '); 
    return; 
}
let Book = Books.find(b=>b.id===BookId); // Looking for book on the array of books
let user = Users.find(u=>u.UserId===UserId); // looking fir user on the array  of users

// revisando si el libro esta en el catalogo

if (!Book){
  console.log (' El libro no se encuentra dentro del catalogo ');
  return;
}

if (!user){
  console.log (' Usuario no registrado:  ');
}

// Investigue este arreglo .indexOf el cual funciona para encontrar la posicion del indice. 

const BookIndex = user.lendBooks.indexOf(BookId);if (BookIndex === -1){
  console.log (' Este usuario no tiene prestado este libro ');
return;
}

user.lendBooks.splice(BookIndex, 1);
Book.available = true ;
console.log('El libro' + Books.title , ' ha sido regresado. ');
}

// function Reports of Books: 

function booksReports(){
  let booksTotal = Books.length;
  let booksAvailable = Books.filter(book => book.available).length;
  let booksLend = booksTotal - booksAvailable;
  let booksByGenre = {};

  Books.forEach(book =>{
    if (booksByGenre[book.genre]){
      booksByGenre[book.genre]++;

    } else {
        booksByGenre[book.genre]=1;
      }
    
   });

  let booksSortByYear = [...Books].sort((a,b) => a.year - b.year);
  let booksOlder = booksSortByYear [0];
  let booksNewer = booksSortByYear [booksSortByYear.length-1];
  
  console.log (' *** REPORTES DE LIBROS ***');
  console.log ( ' Total de libros en catalogo : '+booksTotal );
  console.log (' Total de libros disponibles: '+ booksAvailable);
  console.log (' Total de libros prestados:  '+ booksLend);
  console.log (' Libros por genero: ', booksByGenre);
  console.log(' Libro mas antiguo: ',booksOlder);
  console.log (' Libro mas nuevo: ' , booksNewer);
}

// statistics

function statisticsCalculation (){
  let totalYear = Books.reduce((sum,book) => sum + book.year, 0);
  let averageYear = Math.round(totalYear/Books.length);
  
  let frecuencyYear = {};
  Books.forEach(book =>{
    frecuencyYear[book.year] = (frecuencyYear[book.year]|| 0)+ 1;
  });

  let mostFrecuencyYear = null;
  let maxFrecuency = 0;
 

  for (const [year, frecuency] of Object.entries(frecuencyYear)) {
    if (frecuencyYear > maxFrecuency) {
      mostFrecuencyYear = year;
      maxFrecuency = frecuency;
      
    }  
      
    
  }
  let years = Books.map(book => book.year);
  let oldestYear = Math.min(...years);
  let newestYear = Math.max(...years);
  let yearDifference = newestYear -  oldestYear;

  console.log (' *** Datos estadisticos ***');
  console.table ({
    'promedio de publicacion' : averageYear ,
    'Año mas frecuente ': mostFrecuencyYear ,
    'Frecuencia ': maxFrecuency ,
    'Libro mas antiguo ': oldestYear ,
    'Libro mas nuevo ': newestYear ,
    'Diferencia en años ':  yearDifference ,
  });
   
  return {
    averageYear,
    mostFrecuencyYear,
    yearDifference
  };

}


 
// bubble sort 
// y aqui la famosa opcion y terrorifica, que es para que ordene los datos , 

function  BubbleSort(){
  let swap = false;
   
  let breakCycle = false
  while (!breakCycle){
      for (i =0 ; i<= Books.length ; i++ ){
        if(Books[i+1] != undefined && Books[i+1] != null){
          let currentYear = Books[i].year;
          let nextYear = Books[i+1].year; 
          if (currentYear > nextYear){
            let temporalNextBook = Books[i+1];
            Books[i+1] = Books[i];
            Books[i] = temporalNextBook;
            swap = true;
          }
        }    
      }
    if(!swap){
      breakCycle = true;
    }
    swap = false;
      
  }

  console.log('\n*** Libros ordenados (BubbleSort) ***');
  

}

// block of menu functions 
// Main menu 

function CreateMainMenu () {
    console.log( ' **** MENU LA BIBLIOTECA DE MONICA ****');
    console.log(" 1 Libros");
    console.log(" 2 Usuarios");
    console.log(" 3 Prestamos y Devoluciones ");
    console.log(" 4 Reportes Estadisticos ");
    console.log(" 5 Salir");

    const option = prompt('\n Selecciona una opcion:  ');
    ClearConsole();
switch (option){
    case"1":
    CreateBooksMenu();
    break
    case"2":
    CreateUserMenu();
    break
    case"3":
    CreateLendsMenu();
    break
    case"4":
    CreateReportsMenu();
    break
    case"5":
    console.log (' Saliendo del programa....' );
    exit = false;
    break
    };   
    
    }


  function CreateBooksMenu (){
    console.log("**** LIBROS ****");
    console.log(" 1 Agregar Libro");
    console.log(" 2 Buscar Libro por ID ");
    console.log(" 3 Buscar libro por criterio");
    console.log(" 4 Ordenar Libros");
    console.log(" 5 Borrar Libros");
    console.log(" 6 Salir");
      
    const option = prompt('\n Selecciona una opcion:  ');
    ClearConsole();
    switch (option){
        case "1":
        let promptId = parseInt(prompt(' '));
        let promptTitle = prompt(' Ingresa titulo del libro: ');
        let promptAuthor = prompt(' Ingresa nombre del autor libro: ');
        let ptomptYear = parseInt(prompt(' Ingresa anio de publicacion libro: '));
        let promptGenre = prompt(' Ingresa genero o clasificacon de libro: ');
        let promptAvailable = prompt(' Disponibilidad del libro true/false: ');
        promptAvailable = promptAvailable ===  "true"? true : false;
       
        let PromptBook= {
            promptId: promptId,
            promptTitulo:promptTitle,
            promptAutor:promptAuthor,
            promptYear:ptomptYear,   
            promptGenre:promptGenre,
            promptAvailable:promptAvailable 
         }
          
         Books.push(PromptBook); 
          case "2":
          let searchBookId= parseInt(prompt(' Indique el ID del libro a buscar: ')); 
          let FindedBook = SearchBookById(searchBookId);
          console.log(DataNormalizeBook(FindedBook));
          break
          case "3": 
          let SearchBookCriteria = prompt('Por que quieres buscar: titulo, autor o genero: ');
          let SearchCriteriaValue = prompt('Introduce tu busqueda:  ');
          console.log(SearchBookByCriteria(SearchBookCriteria,SearchCriteriaValue));
          break
          case "4":
          BubbleSort()
          console.log(' Los libros han sido ordenados por anio en bubble sort:   ');
          console.log (Books);

          break
          case"5":
          let UserAnswer=prompt(' Deseas eliminar un libro? (si/no): ').toLowerCase(); 
           if (UserAnswer==='si'){
             let DeleteBookId =parseInt(prompt(' Escribe el ID del libro que deseas eliminar: '));
            if (!isNaN(DeleteBookId)){
              DeleteBookById(DeleteBookId);
              console.log('El libro ha sido eliminado. La lista actualizada ha quedado asi: ');
              console.log(Books);
            } else {
              console.log ('Por favor ingresa un ID valido. ');
            }

          } else if (UserAnswer==='no'){
            console.log (' Operacion cancelada ');
            
          }
          break
          case "6":
            console.log (' saliendo del programa' );
            
            break
            }
            
          }
                 
          


  function CreateUserMenu () {
    
    console.log("**** USUARIOA ****");
    console.log(" 1 Registrar usuario  ");
    console.log(" 2 Mostrar todos los usuarios ");
    console.log(" 3 Buscar usuario ID ");
    console.log(" 4 Borrar Usuario ");
    console.log(" 5 Salir "); 

    const option = prompt ('\n Selecciona una opcion:  ');
    ClearConsole();
   
    switch (option) {
        case "1":
            let UserId = parseInt (prompt(' ID de usuario: '));
            let UserName = prompt ( ' Nombre de Usuario: ');
            let UserLastname = prompt ( ' Apellido de Usuario: ');
            let UserAge = prompt (' edad de usuario: ');
            let UserMail = prompt (' E-mail del Usuario: ')
            let NewUser= {
            UserId: UserId,
            UserName:UserName,
            UserLastname:UserLastname,
            UserAge:UserAge,   
            UserMail:UserMail,
             
         }
              Users.push(NewUser);
        break      
        case "2":
        PrintUsers (Users);
        break
        case "3":  
        let searchUserId = parseInt(prompt(' Escribe el ID de usuario que estas buscando:  '));
        let FindedUser = SearchUserById(searchUserId) 
        console.log (FindedUser);
        break
        case"4":
        let UserAnswer=prompt(' Deseas eliminar un usuario? (si/no): ').toLowerCase(); 
           if (UserAnswer==='si'){
             let DeleteUser=parseInt(prompt(' Escribe el ID del usuario que deseas eliminar: '));
            if (!isNaN(DeleteUser)){
              DeleteUserById(DeleteUser);
              console.log('El usuario ha sido eliminado. La lista actualizada ha quedado asi: ');
              console.log (Users);
            } else {
              console.log ('Por favor ingresa un ID valido. ');
            }

          } else if (UserAnswer==='no'){
            console.log (' Operacion cancelada ');
          } break;

      }
    
  }

  function  CreateLendsMenu(){
    console.log("**** PRESTAMOS ****");
    console.log('1 Prestar libro ');
    console.log('2 Devolver libro ');
    console.log('3 Reportes de prestamos');
    const option = prompt ('\n Selecciona una opcion:  ');
    ClearConsole();

    switch (option){
      case "1":
        lendBook(); // prestar libro
        break;
      case "2": 
       returnBook(); // regresar libro,
        break; 
      case "3":
       booksReports() // imprime todos los reportes 
       break;
        
    }

  }

  function CreateReportsMenu () {
    console.log("**** REPORTES ESTADISTICO ****");
    console.log('1 Reportes Estadisticos ');
    console.log('2 Salir');
    const option = prompt ('\nSelecciona una opcion:  ');
    ClearConsole(); 

    switch (option){
      case "1":
        statisticsCalculation();
      break;  

    }

  }
         
    
             

    

let exit = true;
while (exit){
CreateMainMenu ();
}
  











             