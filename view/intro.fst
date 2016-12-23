<!DOCTYPE html>
<html>
  <%this.include('_partial/head', {title: 'welcome'})%>
  <body>
    <%this.include('_partial/offline_header')%>
    <%this.include('_partial/input')%>
    <%this.include('_partial/tab')%>
    <div class="container">
      <div class="row" id="todos">
        <h2>TodoList</h2>
        <ul id="list" class="list todo-list all">
        </ul>
      </div>
    </div>
    <%this.include('_partial/footer')%>
  <script src="intro.bundle.js"></script>
  </body>
</html>
