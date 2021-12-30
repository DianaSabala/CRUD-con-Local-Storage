var app = new function() {
    this.el = document.getElementById('books');
  
    this.books = [];
    
    this.FetchAll = function() {
      var data = '';
  
      if (this.books.length > 0) {
        for (i = 0; i < this.books.length; i++) {
          data += '<tr>';
          data += '<td>'+(i+1)+". " + this.books[i] + '</td>';
          data += '<td><button onclick="app.Edit(' + i + ')"  class="btn btn-warning">Edit</button></td>';
          data += '<td><button onclick="app.Delete(' + i + ')"  class="btn btn-danger">Delete</button></td>';
          data += '</tr>';
        }
      } 
  
      this.Count(this.books.length);
      return this.el.innerHTML = data;
    };
  
    this.Add = function () {
      el = document.getElementById('add-book');
      // Get the value
      var book = el.value;
  
      if (book) {
        // Add the new value        
        this.books.push(book.trim())
        localStorage.setItem('Libros', JSON.stringify(this.books)); //Local storage
        // Reset input value
        el.value = '';
        // Dislay the new list
        this.FetchAll();
      }
    };
  
    this.Edit = function (item) {
      var el = document.getElementById('edit-book');
      // Display value in the field
      el.value = this.books[item];
      // Display fields
      document.getElementById('edit-box').style.display = 'block';
      self = this; //this, es dependiente del contexto en el cual se encuentra y va a ir cambiando de método en método ya que es dinámico. 
            //La técnica de dejar this guardado en self se usa para tener siempre la referencia original al objeto que disparó ese método.
  
      document.getElementById('save-edit').onsubmit = function() {
        // Get value
        var book = el.value;
  
        if (book) {
          // Edit value
          self.books.splice(item, 1, book.trim());
          localStorage.setItem('Libros', JSON.stringify(self.books)); //Local storage
          // Display the new list
          self.FetchAll();
          // Hide fields
          CloseInput();
        }
      }
    };
  
    this.Delete = function (item) {
      // Delete the current row
      this.books.splice(item, 1);
      console.log(item, this.books); //I just wanted see what is in the array
      localStorage.setItem('Libros', JSON.stringify(this.books)) //Local storage
      // Display the new list
      this.FetchAll();
    };
  
    this.Count = function(data) {
      var el   = document.getElementById('counter');
      var name = 'Books';
  
      if (data) {
          if(data ==1){
              name = 'Book'
          }
        el.innerHTML = data + ' ' + name ;
      } 
      else {
        el.innerHTML = 'No ' + name;
      }
    };

    //Local storage
    this.Storage = function() {
        var cat = JSON.parse(localStorage.getItem('Libros'));
        if(cat !== null) {
          console.log("done"); //I just wanna see if it works
          this.books = cat;    
          console.log(this.books); //I just wanted see what is in the array
          this.FetchAll();
        }
    };
    this.Storage();
  }
  
  app.FetchAll();
  
  function CloseInput() {
    document.getElementById('edit-box').style.display = 'none';
  }