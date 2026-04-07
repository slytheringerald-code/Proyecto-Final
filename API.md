# Documentacion de la API

La aplicacion cuenta con una API RESTful disenada para gestionar usuarios y elementos.

##* Autenticacion (Usuarios)

Endpoints para la gestion de acceso al sistema.

### Registrar usuario
- URL: /api/usuarios/registro
- Metodo: POST
- Cuerpo (JSON):
  {
      "nombre": "Estefany",
          "email": "estefany@correo.com",
              "password": "contrasena_segura"
                }

                ### Iniciar sesion
                - URL: /api/usuarios/login
                - Metodo: POST
                - Cuerpo (JSON):
                  {
                      "email": "estefany@correo.com",
                          "password": "contrasena_segura"
                            }
                            - Respuesta: Token JWT para las peticiones autenticadas.

                            ---

                            ##* Gestion de Elementos

                            *Todos los endpoints de elementos requieren el token JWT en el encabezado Authorization: Bearer <token>.*

                            ### Listar elementos
                            - URL: /api/elementos
                            - Metodo: GET
                            - Descripcion: Obtiene todos los elementos pertenecientes al usuario autenticado.

                            ### Crear elemento
                            - URL: /api/elementos
                            - Metodo: POST
                            - Cuerpo (JSON):
                              {
                                  "nombre": "Mi nuevo elemento",
                                      "descripcion": "Descripcion del recurso"
                                        }

                                        ### Actualizar elemento
                                        - URL: /api/elementos/:id
                                        - Metodo: PUT
                                        - Cuerpo (JSON):
                                          {
                                              "nombre": "Nombre modificado",
                                                  "descripcion": "Descripcion actualizada"
                                                    }

                                                    ### Eliminar elemento
                                                    - URL: /api/elementos/:id
                                                    - Metodo: DELETE
                                                    - Descripcion: Elimina de forma permanente el elemento de la base de datos local.

                                                    ---

                                                    ##* Salud del sistema
                                                    - URL: /salud
                                                    - Metodo: GET
                                                    - Descripcion: Verifica si los servicios estan activos.
