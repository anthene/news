drop table news;
drop function get_random_id();
--drop sequence id_sec;
--
create function get_random_id() returns bigint as $$
        BEGIN
                RETURN floor(random() * 4294967295);
        END;
$$ LANGUAGE plpgsql;

--create sequence id_sec;

create table news (
    id bigint constraint person_id primary key default get_random_id(),
    date timestamp with time zone default now(),
    header varchar(256)
);

-- insert into news (header) values ('#1'), ('#2');
-- insert into news (id, header) values (12412, '#3');
-- insert into news (date, header) values ('2017-02-15T18:10:50.656Z', '#4');

-- delete from news;

select * from news;

