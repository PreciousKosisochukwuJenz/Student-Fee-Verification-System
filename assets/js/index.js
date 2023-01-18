// const url = "https://sprm.herokuapp.com";
const url = "http://localhost:3000";

$("#setting").submit(function (event) {
  event.preventDefault();

  const unindexed_array = $(this).serializeArray();
  const data = {};

  $.map(unindexed_array, function (n, i) {
    data[n["name"]] = n["value"];
  });

  const request = {
    url: `${url}/api/settings`,
    method: "PUT",
    data: data,
  };

  $.ajax(request).done(function (response) {
    $("#modal-title").html(response.message);
    $("#modal-success").modal("show");
  });
});

$("#CreateUserBtn").click((event) => {
  event.preventDefault();

  const prefix = "#create";
  const username = $(prefix + "username").val();
  const email = $(prefix + "email").val();
  const password = $(prefix + "password").val();
  const passwordSalt = $(prefix + "passwordSalt").val();

  const request = {
    url: `${url}/api/users/`,
    method: "POST",
    data: { username, email, password, passwordSalt },
  };

  $.ajax(request).done(function (response) {
    $("#modal-title").html(response.message);
    $("#modal-success").modal("show");
  });
});

$(".EditUserBtn").click((event) => {
  event.preventDefault();
  const id = event.target.dataset.id;
  const request = {
    url: `${url}/api/users/${id}`,
    method: "GET",
  };

  $.ajax(request).done(function (response) {
    const prefix = "#edit";
    $(prefix + "username").val(response.user.username);
    $(prefix + "email").val(response.user.email);
    $(prefix + "id").val(response.user._id);
  });
});

$("#UpdateUserBtn").click((event) => {
  event.preventDefault();
  const id = $("#editid").val();

  const prefix = "#edit";
  const username = $(prefix + "username").val();
  const email = $(prefix + "email").val();

  const request = {
    url: `${url}/api/users/${id}`,
    method: "PUT",
    data: { username, email },
  };

  $.ajax(request).done(function (response) {
    $("#modal-title").html(response.message);
    $("#modal-success").modal("show");
  });
});

function setId(event) {
  const id = event.target.dataset.id;
  $("#modal-danger")[0].dataset.id = id;
}
$(".DeleteUserBtn").click((event) => {
  event.preventDefault();

  const id = $("#modal-danger")[0].dataset.id;

  const request = {
    url: `${url}/api/users/${id}`,
    method: "DELETE",
  };

  $.ajax(request).done(function (response) {
    $("#modal-title").html(response.message);
    $("#modal-danger").modal("hide");
    $("#modal-success").modal("show");
  });
});

$("#CreateRoleBtn").click((event) => {
  event.preventDefault();

  const prefix = "#create";
  const description = $(prefix + "description").val();

  const request = {
    url: `${url}/api/roles/`,
    method: "POST",
    data: { description },
  };

  $.ajax(request).done(function (response) {
    $("#modal-title").html(response.message);
    $("#modal-success").modal("show");
  });
});

$(".EditRoleBtn").click((event) => {
  event.preventDefault();
  const id = event.target.dataset.id;
  const request = {
    url: `${url}/api/roles/${id}`,
    method: "GET",
  };

  $.ajax(request).done(function (response) {
    const prefix = "#edit";
    $(prefix + "description").val(response.role.description);
    $(prefix + "id").val(response.role._id);
  });
});

$("#UpdateRoleBtn").click((event) => {
  event.preventDefault();
  const id = $("#editid").val();
  const prefix = "#edit";
  const description = $(prefix + "description").val();

  const request = {
    url: `${url}/api/roles/${id}`,
    method: "PUT",
    data: { description },
  };

  $.ajax(request).done(function (response) {
    $("#modal-title").html(response.message);
    $("#modal-success").modal("show");
  });
});

$(".DeleteRoleBtn").click((event) => {
  event.preventDefault();

  const id = $("#modal-danger")[0].dataset.id;

  const request = {
    url: `${url}/api/roles/${id}`,
    method: "DELETE",
  };

  $.ajax(request).done(function (response) {
    $("#modal-title").html(response.message);
    $("#modal-danger").modal("hide");
    $("#modal-success").modal("show");
  });
});

$("#LoginBtn").click(function (event) {
  event.preventDefault();

  $("#LoginForm").submit();
});
