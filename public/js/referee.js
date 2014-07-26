var stage = [
    "NORMAL_FIRST_HALF_PRE",
    "NORMAL_FIRST_HALF",
    "NORMAL_HALF_TIME",
    "NORMAL_SECOND_HALF_PRE",
    "NORMAL_SECOND_HALF",
    "EXTRA_TIME_BREAK",
    "EXTRA_FIRST_HALF_PRE",
    "EXTRA_FIRST_HALF",
    "EXTRA_HALF_TIME",
    "EXTRA_SECOND_HALF_PRE",
    "EXTRA_SECOND_HALF",
    "PENALTY_SHOOTOUT_BREAK",
    "PENALTY_SHOOTOUT",
    "POST_GAME"
];

var command = [
    "HALT",
    "STOP",
    "NORMAL_START",
    "FORCE_START",
    "PREPARE_KICKOFF_YELLOW",
    "PREPARE_KICKOFF_BLUE",
    "PREPARE_PENALTY_YELLOW",
    "PREPARE_PENALTY_BLUE",
    "DIRECT_FREE_YELLOW",
    "DIRECT_FREE_BLUE",
    "INDIRECT_FREE_YELLOW",
    "INDIRECT_FREE_BLUE",
    "TIMEOUT_YELLOW",
    "TIMEOUT_BLUE",
    "GOAL_YELLOW",
    "GOAL_BLUE"
];


function referee (packet) {
    $ ("#stage").text (stage[packet.stage]);
    $ ("#command").text (command[packet.command]);

    var blue_name = $ ("#blue");
    var yellow_name = $ ("#yellow");
    blue_name.text (packet.blue.name);
    yellow_name.text (packet.yellow.name);

    // var max = Math.max (blue_name.width (), yellow_name.width ());
    // blue_name.width (max);
    // yellow_name.width (max);

    $ ("#blue_score").text (packet.blue.score);
    $ ("#yellow_score").text (packet.yellow.score);
}
