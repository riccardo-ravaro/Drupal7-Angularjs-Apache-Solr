<header class="header">
  <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
    <div class="container-fluid">
      <!-- Brand and toggle get grouped for better mobile display -->
      <div class="navbar-header">
        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#header-navigation">
          <span class="sr-only">Toggle navigation</span>
          <span class="glyphicon glyphicon-align-justify"></span>
        </button>
        <button type="button" class="navbar-toggle navbar-toggle-left" data-toggle="collapse" data-target="#header-search">
          <span class="sr-only">Toggle search</span>
          <span class="glyphicon glyphicon-search"></span>
        </button>
        <a class="navbar-brand" href="#"><img src="../images/logo-inverse.png" alt="Urbinfo" width="150" height="22" /></a>
      </div>

      <form class="navbar-form navbar-left collapse navbar-collapse form-inline" role="search" id="header-search">
        <div class="form-group">
          <div class="input-group">
            <input type="text" class="form-control" placeholder="I'm looking for…">
            <div class="input-group-btn">
              <button type="button" class="btn btn-default dropdown-toggle" id="dropdownMenu1" data-toggle="dropdown"><span class="caret"></span></button>
              <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
                <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Action</a></li>
                <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Another action</a></li>
                <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Something else here</a></li>
                <li role="presentation" class="divider"></li>
                <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Separated link</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class="input-group">
            <input type="text" class="form-control" placeholder="Near…">
            <div class="input-group-btn">
              <button type="button" class="btn btn-default">
                <span class="glyphicon glyphicon-map-marker"></span>
              </button>
            </div>
          </div>
        </div>
        <div class="form-group">
          <button class="btn btn-header" type="button">
            <span class="glyphicon glyphicon-search"></span>
            <span class="visible-xs-inline">Search</span>
          </button>
        </div>
      </form>

      <div class="collapse navbar-collapse" id="header-navigation">
        <div class="navbar-right">
          <ul class="nav navbar-nav navbar-right">
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                <span class="glyphicon glyphicon-user"></span>
                Joe Bloggs
                <span class="badge">42</span>
                <span class="caret"></span>
              </a>
              <ul class="dropdown-menu" role="menu">
                <li><a href="#">My account</a></li>
                <li><a href="#">My businesses</a></li>
                <li class="divider"></li>
                <li><a href="#">Log out</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div><!-- /.navbar-collapse -->
    </div><!-- /.container-fluid -->
  </nav><!-- /.navbar -->
</header><!-- /.page__header -->
