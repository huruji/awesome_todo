<!DOCTYPE html>
<html>
  <%this.include('_partial/head', {title: 'join'})%>
  <body>
    <div class="body">
      <%this.include('_partial/offline_header')%>
      <form autocomplete="off" id="form" action="/join" method="POST" class="container">
        <div class="row">
          <p class="title">Join</p>
        </div>
        <%if(this.err){%>
        <div class="row">
          <p class="error"><%this.err%></p>
        </div>
        <%}%>
        <div class="row">
          <div class="input-field">
            <label for="username">User Name</label>
            <input type="text" name="username" />
          </div>
        </div>
        <div class="row">
          <div class="input-field">
            <label for="pwd">Password</label>
            <input type="password" name="pwd" />
          </div>
        </div>
        <div class="row">
          <div class="input-field">
            <label for="capture">Capture</label>
            <input type="text" name="capture" />
          </div>
        </div>
        <div class="row">
          <img src="/capture/01" onclick="javascript:this.src='/capture/'+Math.floor(Math.random()*100+11)" />
        </div>
        <div class="row">
          <input type="submit" value="submit" />
        </div>
      </form>
    </div>
    <%this.include('_partial/footer')%>
    <script src="loginAndJoin.bundle.js"></script>
  </body>
</html>
