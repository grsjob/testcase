import { rest } from "msw";
export const handlers = [
  rest.post("http://api.pf-invest.com/tests/get_questions.php", (
    req, res, ctx 
  ) => {
    return res(ctx.status(200),
      ctx.json({
        "status": "success",
        "page_id": "page__search-1",
        "title": "title",
        "components": [
          {
            "id": "component__card",
            "name": "Карточка",
            "sort": "0",
            "questions": [
              {
                "id": "12",
                "title": "Насколько легко читаются текстовые элементы.",
                "wants_comment": "0",
                "answers": [
                  {
                    "id": "15",
                    "label": "Хорошо",
                    "weight": "2"
                  },
                  {
                    "id": "14",
                    "label": "Средне",
                    "weight": "1"
                  },
                  {
                    "id": "13",
                    "label": "Плохо",
                    "weight": "0"
                  }
                ]
              },
              {
                "id": "1",
                "title": "Нравится ли компонент?",
                "wants_comment": "0",
                "answers": [
                  {
                    "id": "2",
                    "label": "Да",
                    "weight": "1"
                  },
                  {
                    "id": "1",
                    "label": "Нет",
                    "weight": "0"
                  }
                ]
              },
              {
                "id": "3",
                "title": "Оцените красоту",
                "wants_comment": "0",
                "answers": [
                  {
                    "id": "13",
                    "label": "Плохо",
                    "weight": "0"
                  },
                  {
                    "id": "14",
                    "label": "Средне",
                    "weight": "1"
                  },
                  {
                    "id": "15",
                    "label": "Хорошо",
                    "weight": "2"
                  }
                ]
              }
            ]
          },
          {
            "id": "component__top-navigation-bar",
            "name": "Верхняя навигация",
            "sort": "1",
            "questions": [
              {
                "id": "2",
                "title": "Оцените удобство от 1 до 5?",
                "wants_comment": "-1",
                "answers": [
                  {
                    "id": "3",
                    "label": "1",
                    "weight": "0"
                  },
                  {
                    "id": "4",
                    "label": "2",
                    "weight": "1"
                  },
                  {
                    "id": "5",
                    "label": "3",
                    "weight": "2"
                  },
                  {
                    "id": "6",
                    "label": "4",
                    "weight": "3"
                  },
                  {
                    "id": "7",
                    "label": "5",
                    "weight": "4"
                  }
                ]
              },
              {
                "id": "1",
                "title": "Нравится ли компонент?",
                "wants_comment": "0",
                "answers": [
                  {
                    "id": "2",
                    "label": "Да",
                    "weight": "1"
                  },
                  {
                    "id": "1",
                    "label": "Нет",
                    "weight": "0"
                  }
                ]
              }
            ]
          },
          {
            "id": "component__search-box",
            "name": "Поиск",
            "sort": "2",
            "questions": [
              {
                "id": "5",
                "title": "Оцените кнопку",
                "wants_comment": "-1",
                "answers": [
                  {
                    "id": "15",
                    "label": "Хорошо",
                    "weight": "2"
                  },
                  {
                    "id": "13",
                    "label": "Плохо",
                    "weight": "0"
                  }
                ]
              },
              {
                "id": "4",
                "title": "Оцените цветовую палитру",
                "wants_comment": "1",
                "answers": [
                  {
                    "id": "15",
                    "label": "Хорошо",
                    "weight": "2"
                  },
                  {
                    "id": "14",
                    "label": "Средне",
                    "weight": "1"
                  },
                  {
                    "id": "13",
                    "label": "Плохо",
                    "weight": "0"
                  }
                ]
              },
              {
                "id": "1",
                "title": "Нравится ли компонент?",
                "wants_comment": "-1",
                "answers": [
                  {
                    "id": "2",
                    "label": "Да",
                    "weight": "1"
                  },
                  {
                    "id": "1",
                    "label": "Нет",
                    "weight": "0"
                  }
                ]
              },
              {
                "id": "17",
                "title": "Хотели ли вы добавить что-то для своего удобства? (да - нет) ",
                "wants_comment": "-1",
                "answers": [
                  {
                    "id": "2",
                    "label": "Да",
                    "weight": "1"
                  },
                  {
                    "id": "1",
                    "label": "Нет",
                    "weight": "0"
                  }
                ]
              }
            ]
          },
          {
            "id": "component__bottom-nav-bar",
            "name": "Нижняя навигация",
            "sort": "3",
            "questions": [
              {
                "id": "2",
                "title": "Оцените удобство от 1 до 5?",
                "wants_comment": "0",
                "answers": [
                  {
                    "id": "3",
                    "label": "1",
                    "weight": "0"
                  },
                  {
                    "id": "4",
                    "label": "2",
                    "weight": "1"
                  },
                  {
                    "id": "5",
                    "label": "3",
                    "weight": "2"
                  },
                  {
                    "id": "6",
                    "label": "4",
                    "weight": "3"
                  },
                  {
                    "id": "7",
                    "label": "5",
                    "weight": "4"
                  }
                ]
              },
              {
                "id": "12",
                "title": "Насколько легко читаются текстовые элементы.",
                "wants_comment": "0",
                "answers": [
                  {
                    "id": "13",
                    "label": "Плохо",
                    "weight": "0"
                  },
                  {
                    "id": "14",
                    "label": "Средне",
                    "weight": "1"
                  },
                  {
                    "id": "15",
                    "label": "Хорошо",
                    "weight": "2"
                  }
                ]
              },
              {
                "id": "13",
                "title": "Понятно ли назначение иконок.",
                "wants_comment": "0",
                "answers": [
                  {
                    "id": "16",
                    "label": "Понятно",
                    "weight": "1"
                  },
                  {
                    "id": "17",
                    "label": "Не понятно",
                    "weight": "0"
                  }
                ]
              }
            ]
          }
        ]
      }));
  }),
];
