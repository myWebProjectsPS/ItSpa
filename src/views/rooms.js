import $ from 'jquery';
import { service } from '../common/service';
import { Cart } from '../cart/cart';
import { registrationService } from '../registration/registration';
import icon from "../images/rooms/pokój.png"

export const rooms = () => {
  
  const fragment = $(new DocumentFragment());
  $('main').height(1600)
  let cartCookie = new Cart
  let login = registrationService.getloginName()
  let cartCookieContent = () => {
    if (cartCookie.get()[0]) {
      return cartCookie.get()[0]
    } else { return "Reservation/" }
  }

  let yearPlus = new Date(new Date().setFullYear(new Date().getFullYear() + 1))

  return service.getRooms("rooms")
    .then(res => {
      let rooms = res.map(room => {
        let numbersOfRooms = res.length
        let divBig = $('<div class="col-lg-4 col-md-6 mb-4"></div>')
        let div = $('<div class="card-body"></div>')
        let image = $(`<img class="card-img-top" src=${icon} alt="">`)
        let h4 = $(`<div class="row justify-content-center"><h4 class="card-title">${room.name}</h4></div>`)
        let availability = $(`<div class="row justify-content-center"></div>`)
        let description = $(`<p class="card-text">Liczba łóżek: ${room.beds}, ilość osób: ${room.guests}, cena: ${room.price}</p>`)
        let arrival = $(`<label class="col-form-label">Data przyjazdu: <input type="date" class="form-control" id="${room.name}Arrival" min="${service.getDate()}" max="${yearPlus.toJSON().slice(0, 10).replace(/-/g, '-')}" value="${service.getDate()}"></label>`)
        let departure = $(`<label class="col-form-label">Data wyjazdu: <input type="date" class="form-control" id="${room.name}Departure" min="${service.getDate()}" max="${yearPlus.toJSON().slice(0, 10).replace(/-/g, '-')}"></label>`)
        let button = ""
        if (login) {
          button = $('<br><div class="row justify-content-center"><button class="btn btn-secondary">Rezerwuj</button></div>')
          availability.append("<h6>Dostępny</h6>")
        }
        else {
          if (numbersOfRooms % room.id == 0) {
            button = $('<br><div class="row justify-content-center"><button class="btn btn-secondary" disabled>Rezerwuj</button></div>')
            availability.append("<h6>Oferta dla zalogowanych użytkowników</h6>")
          } else {
            button = $('<br><div class="row justify-content-center"><button class="btn btn-secondary">Rezerwuj</button></div>')
            availability.append("<h6>Dostępny</h6>")
          }
        }

        button.on("click", () => {
          if ($(`input[id="${room.name}Arrival"]`).val() && $(`input[id="${room.name}Departure"]`).val()) {
            if (service.dateCompare($(`input[id="${room.name}Arrival"]`).val(), $(`input[id="${room.name}Departure"]`).val()) == true) {
              alert(`Zarezerwowałeś: ${room.name} od ` + $(`input[id="${room.name}Arrival"]`).val() + " do " + $(`input[id="${room.name}Departure"]`).val())
              cartCookie.set([cartCookieContent() + `Reservation/${room.name}/` + $(`input[id="${room.name}Arrival"]`).val() + "/" + $(`input[id="${room.name}Departure"]`).val() + "/" + room.price])
            }
            else { alert("Data wyjazdu musi być późniejsza od daty przyjazdu") }
          }
          else { alert("Wprowadź datę przyjazdu i odjazdu") }
        })
        div.append(h4, availability, description, image, arrival, departure, button)
        return divBig.append(div)

      })
      return fragment
        .append(rooms.map(room => { return room }))
    }).catch(er => {
      return fragment
        .append('<div class="mt-5 container text-danger"><h2>Wystąpiły problemy z połączeniem. Prosimy spróbować później</h2></div>')
    })

};

