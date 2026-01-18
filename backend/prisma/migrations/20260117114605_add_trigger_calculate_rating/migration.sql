-- This is an empty migration.
CREATE OR REPLACE FUNCTION update_shop_rating()
RETURNS TRIGGER AS $$
DECLARE
    store_id UUID;
    avg_rating REAL;
    total_count INT;
BEGIN
    IF TG_OP = 'DELETE' THEN
        store_id := OLD."storeId";
    ELSE
        store_id := NEW."storeId";
    END IF;

    SELECT
        COALESCE(AVG(rating),0),
        COUNT(*)
    INTO avg_rating, total_count
    FROM rating
    WHERE "storeId" = store_id;

    UPDATE store
    SET
        "avg_rating" = ROUND(avg_rating::NUMERIC,1),
        "total_rating_count" = total_count
    WHERE id = store_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
