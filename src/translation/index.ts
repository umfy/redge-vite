export default {
  en: {}, // TODO
  pl: {
    tabs: {
      homePage: 'Strona główna',
      todoList: 'Lista zadań',
      buttons: {
        darkMode: 'Tryb ciemny',
      }
    },
    homePage: {
      header: 'Opis zadania:',
      content: `Wykonanie appki „todo list” w dowolnej technologii. Powinna być możliwość
              wyświetlania listy notatek, wraz z dodawaniem/edycją/usuwaniem. Powinna być
              możliwość paginacji, oraz wyszukiwania notatek. Należy wykorzystać api:
              https://jsonplaceholder.typicode.com. Dodatkowo należy dodać przełącznik do
              trybu ciemnego.`
    },
    todoList: {
      headers: {
        searchBar: 'Wyszukiwarka',
        modification: 'Edycja elementu'
      },
      buttons: {
        add: 'Dodaj nowy element',
        delete: 'Usuń',
        edit: 'Edytuj',
        next: 'Dalej',
        back: 'Wstecz',
      },
      pagination: {
        noData: 'Brak rekordów',
        info: 'Pokazywanie {start} - {end} z {total}'
      }
    },
    todoForm: {
      user: 'Użytkownik',
      description: 'Opis',
      buttons:{
        save: 'Zapisz'
      }
    },
    todoItem: {
      status: {
        finished: 'Zakończono',
        inProgress: 'W trakcie realizacji',
      }
    }
  }
}
