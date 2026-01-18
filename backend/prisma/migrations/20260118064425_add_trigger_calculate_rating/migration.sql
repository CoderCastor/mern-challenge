CREATE OR REPLACE FUNCTION update_shop_rating()
RETURNS TRIGGER AS $$
DECLARE
    
    target_store_id TEXT;
    calc_avg_rating REAL;
    calc_total_count INT;
BEGIN
    
    IF (TG_OP = 'DELETE') THEN
        target_store_id := OLD."storeId";
    ELSE
        target_store_id := NEW."storeId";
    END IF;

    
    SELECT
        COALESCE(AVG(rating), 0),
        COUNT(*)
    INTO calc_avg_rating, calc_total_count
    FROM rating
    WHERE "storeId" = target_store_id;

    
    UPDATE store
    SET
        "avg_rating" = calc_avg_rating, 
        "total_rating_count" = calc_total_count
    WHERE id = target_store_id;

    RETURN NULL; 
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_shop_rating ON rating;

CREATE TRIGGER trigger_update_shop_rating
AFTER INSERT OR UPDATE OR DELETE ON rating
FOR EACH ROW
EXECUTE FUNCTION update_shop_rating();