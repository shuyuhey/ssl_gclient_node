var field_2012 = {
    line_width                        :   10,
    field_length                      : 6050,
    field_width                       : 4050,
    boundary_width                    :  250,
    referee_width                     :  425,
    goal_width                        :  700,
    goal_depth                        :  180,
    goal_wall_width                   :   20,
    center_circle_radius              :  500,
    defense_radius                    :  800,
    defense_stretch                   :  350,
    free_kick_from_defense_dist       :  200,
    penalty_spot_from_field_line_dist :  750,
    penalty_line_from_spot_dist       :  400,
    // Not official parameters
    field_arround_margin              :  675
};

var field = field_2012;
field.total_field_length = field.field_length + field.field_arround_margin * 2;
field.total_field_width  = field.field_width  + field.field_arround_margin * 2;
