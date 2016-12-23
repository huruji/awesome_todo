<!DOCTYPE html>
<html>
  <%this.include('_partial/head', {title: `${this.user}\'s todo`})%>
  <body>
  <div class="body">
    <nav class="nav">
      <div class="container">
        <h1><%this.user%>'s Todo List</h1>
        <ul class="nav-list">
          <li id="remind">
            <span>提醒</span>
            <i class="material-icons">notifications</i>
            <span class="new"><%this.remind%></span>
          </li>
          <li>
            <a href="/logout">
            <span>登出</span>
            <i class="material-icons">power_settings_new</i>
            </a>
          </li>
        </ul>
      </div>
    </nav>
    <%this.include('_partial/input')%>
    <%this.include('_partial/tab')%>
    <div id="todo" class="container">
      <ul class="todos row" data-list="todos">
        <li data-list-item="todos">
          <div class="todo" data-class="todos:finish">
          <div class="info">
            <div class="toggle" data-event="toggleTodo">
              <i class="material-icons">check_box</i>
              <i class="material-icons">check_box_outline_blank</i>
            </div>
            <div class="content">
              <span data-model="todos:todo"></span>
              <input type="text" data-model="todos:todo" />
            </div>
            <div class="operate">
              <i class="material-icons" data-event="edit">mode_edit</i>
              <i class="material-icons" data-event="spread">info</i>
              <i class="material-icons" data-event="remove">clear</i>
              <i class="material-icons" data-event="update">done</i>
            </div>
          </div>
          <div class="detail">
            <div class="members">
              <i class="material-icons">people</i>
              <i class="material-icons">person_add</i>
              <ul>
                <li class="member">
                  <span>mirone</span>
                  <i class="material-icons">clear</i>
                </li>
              </ul>
            </div>
            <div>
              <i class="material-icons">access_time</i>
              <span>2016-12-25</span>
            </div>
          </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <%this.include('_partial/footer')%>
  <script src="user.bundle.js"></script>
  </body>
</html>
