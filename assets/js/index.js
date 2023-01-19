
// const url = "https://sprm.herokuapp.com";
const url = "http://localhost:3000";

$("#LoginBtn").click(function (event) {
  event.preventDefault();

  $("#LoginForm").submit();
});

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

$("#CreateClassBtn").click((event) => {
  event.preventDefault();

  const prefix = "#create";
  const _class = $(prefix + "class").val();
  const level = $(prefix + "level").val();

  const request = {
    url: `${url}/api/class/`,
    method: "POST",
    data: { class: _class, level },
  };

  $.ajax(request).done(function (response) {
    $("#modal-title").html(response.message);
    $("#modal-success").modal("show");
  });
});

$(".EditClassBtn").click((event) => {
  event.preventDefault();
  const id = event.target.dataset.id;
  const request = {
    url: `${url}/api/class/${id}`,
    method: "GET",
  };

  $.ajax(request).done(function (response) {
    const prefix = "#edit";
    $(prefix + "class").val(response.classLevel.class);
    $(prefix + "level").val(response.classLevel.level);
    $(prefix + "id").val(response.classLevel._id);
  });
});

$("#UpdateClassBtn").click((event) => {
  event.preventDefault();
  const id = $("#editid").val();
  const prefix = "#edit";
  const _class = $(prefix + "class").val();
  const level = $(prefix + "level").val();

  const request = {
    url: `${url}/api/class/${id}`,
    method: "PUT",
    data: { class: _class, level },
  };

  $.ajax(request).done(function (response) {
    $("#modal-title").html(response.message);
    $("#modal-success").modal("show");
  });
});

$(".DeleteClassBtn").click((event) => {
  event.preventDefault();

  const id = $("#modal-danger")[0].dataset.id;

  const request = {
    url: `${url}/api/class/${id}`,
    method: "DELETE",
  };

  $.ajax(request).done(function (response) {
    $("#modal-title").html(response.message);
    $("#modal-danger").modal("hide");
    $("#modal-success").modal("show");
  });
});

$("#CreateClassFeeBtn").click((event) => {
  event.preventDefault();

  const prefix = "#create";
  const _class = $(prefix + "class").val();
  const fee = $(prefix + "fee").val();
  const amount = $(prefix + "amount").val();

  const request = {
    url: `${url}/api/classfee/`,
    method: "POST",
    data: { class: _class, fee, amount },
  };

  $.ajax(request).done(function (response) {
    $("#modal-title").html(response.message);
    $("#modal-success").modal("show");
  });
});

$(".EditClassFeeBtn").click((event) => {
  event.preventDefault();
  const id = event.target.dataset.id;
  const request = {
    url: `${url}/api/classfee/${id}`,
    method: "GET",
  };

  $.ajax(request).done(function (response) {
    const prefix = "#edit";
    $(prefix + "class").val(response.classFee.class);
    $(prefix + "fee").val(response.classFee.fee);
    $(prefix + "amount").val(response.classFee.amount);
    $(prefix + "id").val(response.classFee._id);
  });
});

$("#UpdateClassFeeBtn").click((event) => {
  event.preventDefault();
  const id = $("#editid").val();
  const prefix = "#edit";
  const _class = $(prefix + "class").val();
  const fee = $(prefix + "fee").val();
  const amount = $(prefix + "amount").val();

  const request = {
    url: `${url}/api/classfee/${id}`,
    method: "PUT",
    data: { class: _class, fee, amount },
  };

  $.ajax(request).done(function (response) {
    $("#modal-title").html(response.message);
    $("#modal-success").modal("show");
  });
});

$(".DeleteClassFeeBtn").click((event) => {
  event.preventDefault();

  const id = $("#modal-danger")[0].dataset.id;

  const request = {
    url: `${url}/api/classfee/${id}`,
    method: "DELETE",
  };

  $.ajax(request).done(function (response) {
    $("#modal-title").html(response.message);
    $("#modal-danger").modal("hide");
    $("#modal-success").modal("show");
  });
});

$("#CreateStudentBtn").click((event) => {
  event.preventDefault();

  const prefix = "#create";
  const _class = $(prefix + "class").val();
  const surname = $(prefix + "surname").val();
  const firstname = $(prefix + "firstname").val();
  const lastname = $(prefix + "lastname").val();
  const gender = $(prefix + "gender").val();
  const dob = $(prefix + "dob").val();

  const request = {
    url: `${url}/api/student/`,
    method: "POST",
    data: { class: _class, surname, firstname, lastname, gender, dob },
  };

  $.ajax(request).done(function (response) {
    $("#modal-title").html(response.message);
    $("#modal-success").modal("show");
  });
});

$(".EditStudentBtn").click((event) => {
  event.preventDefault();
  const id = event.target.dataset.id;
  const request = {
    url: `${url}/api/student/${id}`,
    method: "GET",
  };

  $.ajax(request).done(function (response) {
    const prefix = "#edit";
    $(prefix + "class").val(response.student.class);
    $(prefix + "surname").val(response.student.surname);
    $(prefix + "firstname").val(response.student.firstname);
    $(prefix + "lastname").val(response.student.lastname);
    $(prefix + "gender").val(response.student.gender);
    $(prefix + "dob").val(response.student.dob);
    $(prefix + "id").val(response.student._id);
  });
});

$("#UpdateStudentBtn").click((event) => {
  event.preventDefault();
  const id = $("#editid").val();
  const prefix = "#edit";
  const _class = $(prefix + "class").val();
  const surname = $(prefix + "surname").val();
  const firstname = $(prefix + "firstname").val();
  const lastname = $(prefix + "lastname").val();
  const gender = $(prefix + "gender").val();
  const dob = $(prefix + "dob").val();

  const request = {
    url: `${url}/api/student/${id}`,
    method: "PUT",
    data: { class: _class, surname, firstname, lastname, gender, dob },
  };

  $.ajax(request).done(function (response) {
    $("#modal-title").html(response.message);
    $("#modal-success").modal("show");
  });
});

$(".DeleteStudentBtn").click((event) => {
  event.preventDefault();

  const id = $("#modal-danger")[0].dataset.id;

  const request = {
    url: `${url}/api/student/${id}`,
    method: "DELETE",
  };

  $.ajax(request).done(function (response) {
    $("#modal-title").html(response.message);
    $("#modal-danger").modal("hide");
    $("#modal-success").modal("show");
  });
});

$("#searchBtn").click((event) => {
  const regnumber = $("#regnumber").val();
  const request = {
    url: `${url}/api/student/search`,
    method: "POST",
    data: { regnumber },
  };
  $("#feetable").empty();
  $.ajax(request).done(function (response) {
    const {
      surname,
      firstname,
      lastname,
      class: classLevel,
      _id: student,
    } = response.student;
    $("#studentnamedisplay").html(`${surname} ${firstname} ${lastname}`);
    $("#classdisplay").html(`${classLevel.class} ${classLevel.level}`);
    $.each(response.classFees, (i, fee) => {
      const html = `<tr>
                      <td> 
                         ${fee.fee}
                        </td>   
                         <td>
                            ₦${fee.amount}
                        </td>
                         <td>
                            ${fee.paid ? 'Paid': 'Not paid'}
                        </td>
                          <td>
                            ${fee.referenceNumber ? fee.referenceNumber : "NIL"}
                        </td>
                         <td>
                          <a
                            href="#"
                            data-amount=${fee.amount}
                            data-fee=${fee.fee}
                            data-classFee=${fee._id}
                            data-student=${student}
                            class="btn btn-primary makepayment"
                            >
                            Make Payment
                          </a>
                        </td>
                      </tr>
      `;
      $("#feetable").append(html);
    });
    $(".makepayment").click((event) => {
      event.preventDefault();

      const name = $("#studentnamedisplay").html();
      const classLevel = $("#classdisplay").html();
      const amount = event.target.dataset.amount;
      const fee = event.target.dataset.fee;
      const classFee = event.target.dataset.classfee;
      const student = event.target.dataset.student;
      payWithPaystack(amount, fee, name, classLevel, classFee, student);
    });
  });
});

function format(amountStr) {
  const amount = amountStr.split(",").join("");
  return parseInt(amount);
}

function payWithPaystack(amount, fee, name, classLevel, classFee, student) {
  debugger;
  let handler = PaystackPop.setup({
    key: "pk_test_86e1266df9b76fd787c35da5abff910d7bb16cf8", // Replace with your public key
    email: "kcokolo10@gmail.com",
    amount: format(amount) * 100,
    label: name + " " + classLevel + " " + fee,
    onClose: function () {
      alert("Window closed.");
    },
    callback: function (response) {
      const request = {
        url: `${url}/api/student/logpayment`,
        method: "POST",
        data: { referenceNumber: response.reference, student, classFee },
      };

      $.ajax(request).done(function (response) {
        $("#modal-title").html(response.message);
        $("#modal-danger").modal("hide");
        $("#modal-success").modal("show");
      });
    },
  });

  handler.openIframe();
}
