## F.5. basebackup\_to\_shell — example "shell" pg\_basebackup module [#](#BASEBACKUP-TO-SHELL)

  * *   [F.5.1. Configuration Parameters](basebackup-to-shell.html#BASEBACKUP-TO-SHELL-CONFIGURATION-PARAMETERS)
  * [F.5.2. Author](basebackup-to-shell.html#BASEBACKUP-TO-SHELL-AUTHOR)

`basebackup_to_shell` adds a custom basebackup target called `shell`. This makes it possible to run `pg_basebackup --target=shell` or, depending on how this module is configured, `pg_basebackup --target=shell:DETAIL_STRING`, and cause a server command chosen by the server administrator to be executed for each tar archive generated by the backup process. The command will receive the contents of the archive via standard input.

This module is primarily intended as an example of how to create a new backup targets via an extension module, but in some scenarios it may be useful for its own sake. In order to function, this module must be loaded via [shared\_preload\_libraries](runtime-config-client.html#GUC-SHARED-PRELOAD-LIBRARIES) or [local\_preload\_libraries](runtime-config-client.html#GUC-LOCAL-PRELOAD-LIBRARIES).

### F.5.1. Configuration Parameters [#](#BASEBACKUP-TO-SHELL-CONFIGURATION-PARAMETERS)

* `basebackup_to_shell.command` (`string`)

    The command which the server should execute for each archive generated by the backup process. If `%f` occurs in the command string, it will be replaced by the name of the archive (e.g. `base.tar`). If `%d` occurs in the command string, it will be replaced by the target detail provided by the user. A target detail is required if `%d` is used in the command string, and prohibited otherwise. For security reasons, it may contain only alphanumeric characters. If `%%` occurs in the command string, it will be replaced by a single `%`. If `%` occurs in the command string followed by any other character or at the end of the string, an error occurs.

* `basebackup_to_shell.required_role` (`string`)

    The role required in order to make use of the `shell` backup target. If this is not set, any replication user may make use of the `shell` backup target.

### F.5.2. Author [#](#BASEBACKUP-TO-SHELL-AUTHOR)

Robert Haas `<rhaas@postgresql.org>`